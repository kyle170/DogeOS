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

        public format(){
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

        public create(fileName): string {
			//the way the system tells if its a pointer and not a file is if it starts with `
			if(this.checkIfFileExists(fileName)){
				_StdOut.putText("File Already Exists!");
			}else{
				var freeLocationForPointer = this.findFreeSpaceOnTheTSB(true);
				var freeLocationForData = this.findFreeSpaceOnTheTSB(true);
				_FileSystem.write(freeLocationForPointer.substring(0,1), freeLocationForPointer.substring(1,2), freeLocationForPointer.substring(2,3), "1"+freeLocationForData+"1"+fileName);
				
			}
        }

        public read(fileName, data): string {
            //TODO
        }

        public write(fileName, data): string {
            if(this.checkIfFileExists(fileName)){ // good, it exists... lets continue
				var fileDataLocation = this.fileDataLocationFinder(fileName);
				alert(fileDataLocation);
				_FileSystem.write(fileDataLocation.substring(0,1), fileDataLocation.substring(1,2), fileDataLocation.substring(2,3), "1---"+"2"+data);
			}else{
				_StdOut.putText("Cannot Write!... File Doesnt Exist!");
			}
        }
		
        private deleteFile(fileName): boolean {
            //TODO
        }
		
		private reserveTSBSpace(i, j, k){
			_FileSystem.write(i, j, k, "1---------------------------------------------------------------");
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
		
		private fileDataLocationFinder(filename: string): string{
			for(var i=0; i<this.tracks; i++){
				for(var j=0; j<this.sectors; j++){ // loop through each sector
					for(var k=0; k<this.blocks; k++){ // loop through each block
						var whatIfound = _FileSystem.read(i,j,k);
						if("1"+filename === whatIfound.substring(4)){
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
		
		private checkIfFileExists(filename): boolean{
			//lets loop to find if each row is used or not and if it is, go deeper
			for(var i=0; i<this.tracks; i++){
				for(var j=0; j<this.sectors; j++){ // loop through each sector
					for(var k=0; k<this.blocks; k++){ // loop through each block
						var whatIfound = _FileSystem.read(i,j,k);
						if("1"+filename === whatIfound.substring(4)){
							return true;
						}
					}
				}
			}
			return false;
		}

        private takeApartFile(t, s, b){
			//read the TSB block!
            var fileData = _FileSystem.read(t,s,b);
			var usageFlag = fileData.substring(0,1);
			var tsbAddress = fileData.substring(1,4);
			var fileContents = fileData.substring(4);
			return [usageFlag, tsbAddress, fileContents];
        }
		

    }

}