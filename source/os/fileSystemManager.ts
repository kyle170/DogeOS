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

        public ls(fileName): string {
            //TODO
        }

        public create(fileName): string {
			var freeLocationForPointer = this.findFreeSpaceOnTheTSB(true);
			var freeLocationForData = this.findFreeSpaceOnTheTSB(true);
			_FileSystem.write(freeLocationForPointer.substring(0,1), freeLocationForPointer.substring(1,2), freeLocationForPointer.substring(2,3), "1"+freeLocationForData+Utils.hexEncode(fileName));
        }

        public read(fileName, data): string {
            //TODO
        }

        public write(fileName): string {
            //TODO
        }
		
        private deleteFile(fileName): boolean {
            //TODO
        }
		
		private reserveTSBSpace(i, j, k){
			_FileSystem.write(i, j, k, "1---------------------------------------------------------------");
		}
		
		private findFreeSpaceOnTheTSB(reserve: boolean): string{
			//type: 0 = pointer, 1= data, 2=swap?
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
		
		private checkIfLocationUsed(i, j, k): boolean {
			//CHECK IF THE BIT IS 1
			var content = _FileSystem.read(i, j, k);
			if(content !== null && content.substring(0,1) === "1"){
				return true;
			}else{
				return false;
			}
		}
		
		private checkIfFileExists(filename):boolean{
			//lets loop to find if each row is used or not and if it is, go deeper
			for(var i=0; i<this.tracks; i++){
				for(var j=0; j<this.sectors; j++){ // loop through each sector
					for(var k=0; k<this.blocks; k++){ // loop through each block
						var whatIfound = _FileSystem.read(i,j,k);
						if(Utils.hexEncode(filename) === whatIfound.substring(4)){
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