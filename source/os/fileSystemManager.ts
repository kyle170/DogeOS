///<reference path="../utils.ts" />
module TSOS {

    export class FileSystemManager {

        private tracks:     number; // a required entity
        private sectors:    number; // a required entity
        private blocks:     number; // a required entity 
        private blockSize:  number; // a required entity
        private headerSize: number; // a required entity

        constructor(){
            this.tracks = _FileSystem.tracks;
            this.sectors = _FileSystem.sectors;
            this.blocks = _FileSystem.blocks;
            this.blockSize = _FileSystem.blockSize;
            this.headerSize = _FileSystem.headerSize;
        }

        public format(): boolean{
			if(!_Formatted){
				var blankBlock = '0';
				for(var i = 0; i < this.blockSize-1; i++){
					blankBlock += '-';
				}
				for(var i = 0; i < this.tracks; i++){
					for(var j = 0; j < this.sectors; j++){
						for(var k = 0; k < this.blocks; k++){
							_FileSystem.write(i, j, k, blankBlock);
						}
					}
				}
				_Formatted = true;
				this.create("swap1", true); // create the swap main
				this.create("swap2", true);  // create the swap alt
				return true;
			}else{
				return false;
			}
        }

        public ls(): string {
			var items = "Files Found: ";
            for(var i=0; i<this.tracks; i++){
				for(var j=0; j<this.sectors; j++){ // loop through each sector
					for(var k=0; k<this.blocks; k++){ // loop through each block
						var whatIfound = _FileSystem.read(i,j,k);
						if("1" === whatIfound.substring(4,5)){
							items += whatIfound.substring(5)+", ";
						}
					}
				}
			}
			return items.substring(0, (items.length)-2);
        }

        public create(fileName, swapOverride: boolean): boolean {
			//the way the system tells if its a pointer and not a file is if it starts with `
			if(this.checkIfFileExists(fileName) && swapOverride === null){
				_StdOut.putText("File Already Exists!");
				return false;
			}else{
				var type = "1";
				var freeLocationForPointer = this.findFreeSpaceOnTheTSB(true);
				var freeLocationForData = this.findFreeSpaceOnTheTSB(true);
				if(fileName.substring(0,4) === "swap"){
					type = "0";
				}
				_FileSystem.write(freeLocationForPointer.substring(0,1), freeLocationForPointer.substring(1,2), freeLocationForPointer.substring(2,3), "1"+freeLocationForData+type+fileName);
				return true;
			}
        }

        public read(fileName, swapOverride: boolean): string {
             if(this.checkIfFileExists(fileName) || swapOverride !== null){ // good, it exists... lets continue
				var fileDataLocation = this.fileDataLocationFinder(fileName);
				var data = _FileSystem.read(fileDataLocation.substring(0,1), fileDataLocation.substring(1,2), fileDataLocation.substring(2,3));
				if(data.substring(0,4) !== "1---"){
					data += this.recursiveRead(data.substring(1,2), data.substring(2,3), data.substring(3,4), "");
				}
				return data.substring(5);
			 }else{
				 return "Cant read: "+fileName;
			 }
        }
		
		
		public recursiveRead(i, j, k, inputString: string): string {
			var data = _FileSystem.read(i, j, k);
			if(data.substring(0,4) === "1---"){
				return ""+inputString+data.substring(5);
			}else{
				this.recursiveRead(data.substring(1,2), data.substring(2,3), data.substring(3,4), ""+data.substring(5));
			}
		}

        public write(fileName, data, swapOverride: boolean): boolean {
            if(this.checkIfFileExists(fileName) || swapOverride !== null){ // good, it exists... lets continue
				var fileDataLocation = this.fileDataLocationFinder(fileName, swapOverride);
				this.recursiveFileDelete(fileDataLocation.substring(0,1), fileDataLocation.substring(1,2), fileDataLocation.substring(2,3)); // get rid of any previous file data!
				if(this.recursiveWrite(fileDataLocation.substring(0,1), fileDataLocation.substring(1,2), fileDataLocation.substring(2,3), data, swapOverride)){
					return true;
				}else{
					return false;
				}
			}else{
				_StdOut.putText("Cannot Write!... File Doesnt Exist!");
				return false;
			}
        }
		
		public recursiveWrite(i, j, k, data,swapOverride: boolean): boolean {
			//console.log(data);
			var padding = 7;
			var type = "2";
			if(swapOverride !== null){
				type = "0";
			}else{
				type = "2";
			}
			if(data.length < this.blockSize-padding){
				_FileSystem.write(i, j, k, "1---"+type+data);
			}else{
				var newLocation = this.findFreeSpaceOnTheTSB(true);
				var shortened = data.substring(0, this.blockSize-padding);
				var whatsleft = data.substring(this.blockSize-padding);
				_FileSystem.write(i, j, k, "1"+newLocation.substring(0,1)+newLocation.substring(1,2)+newLocation.substring(2,3)+type+shortened);
				this.recursiveWrite(newLocation.substring(0,1), newLocation.substring(1,2), newLocation.substring(2,3), whatsleft);				
			}
			return true
		}
		
        public deleteFile(fileName): boolean {
            if(this.checkIfFileExists(fileName)){ // good, it exists... lets continue
				for(var i=0; i<this.tracks; i++){
					for(var j=0; j<this.sectors; j++){ // loop through each sector
						for(var k=0; k<this.blocks; k++){ // loop through each block
							var whatIfound = _FileSystem.read(i,j,k);
							if("1"+fileName === whatIfound.substring(4)){
								if(this.recursiveFileDelete(i, j, k)){
									return true;
								}
							}
						}
					}
				}
			}else{
				return false;
			}
        }
		
		private reserveTSBSpace(i, j, k){
			_FileSystem.write(i, j, k, "1---------------------------------------------------------------");
		}
		
		public recursiveFileDelete(i, j, k): boolean {
			var whatIfound = _FileSystem.read(i,j,k); // read the current block
			_FileSystem.write(i, j, k, "0---------------------------------------------------------------"); // write a blank block
			if(whatIfound.substring(0,4) === "0---"){
				return true;
			}else{
				this.recursiveFileDelete(whatIfound.substring(1,2), whatIfound.substring(2,3), whatIfound.substring(3,4));
			}
			return true;
		}
		
		private findFreeSpaceOnTheTSB(reserve: boolean): string{
			for(var i=0; i< this.tracks; i++){
				for(var j=0; j<this.sectors; j++){
					for(var k=0; k<this.blocks; k++){
						var contents = this.checkIfLocationUsed(i, j, k);
						if(!contents){ // Not Used...lets take it
							if(reserve){ // lets reserve it before we write
								this.reserveTSBSpace(i, j, k);
								return ""+i+j+k; // give back first found free space ;)
							}else{
								return ""+i+j+k; // give back first found free space ;)
							}
						}
					}
				}
			}
			//umm.... no free space left?
			return "No free space left";
		}
		
		private fileDataLocationFinder(filename: string, swapOverride: boolean): string{
			var type = "-1";
			if(swapOverride !== null){
				type = "0";
			}else{
				type = "1";
			}
			for(var i=0; i<this.tracks; i++){
				for(var j=0; j<this.sectors; j++){ // loop through each sector
					for(var k=0; k<this.blocks; k++){ // loop through each block
						var whatIfound = _FileSystem.read(i,j,k);
						if(type+filename === whatIfound.substring(4)){
							return ""+whatIfound.substring(1,4);
						}
					}
				}
			}
			return "NOT FOUND ON SYSTEM";
		}
		
		private checkIfLocationUsed(i, j, k): boolean {
			//CHECK IF THE BIT IS 1
			var content = _FileSystem.read(i, j, k);
			if(content !== null && content.substring(0,1) === "1"){
				return true;
			}else{
				return false;
			}
		}
		
		private checkIfFileExists(filename, swapOverride: boolean): boolean{
			var type = "-1";
			if(swapOverride !== null){
				type = "0";
			}else{
				type = "1";
			}
			//lets loop to find if each row is used or not and if it is, go deeper
			for(var i=0; i<this.tracks; i++){
				for(var j=0; j<this.sectors; j++){ // loop through each sector
					for(var k=0; k<this.blocks; k++){ // loop through each block
						var whatIfound = _FileSystem.read(i,j,k);
						if(type+filename === whatIfound.substring(4)){
							return true;
						}
					}
				}
			}
			return false;
		}


    }

}