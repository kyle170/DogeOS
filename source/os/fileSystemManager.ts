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
            var track = 0;
			var sector = 0;
			var block = 2;
			_FileSystem.write(track, sector, block, "1101"+Utils.hexEncode(fileName));
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
		
		private checkIfFileExists(filename):boolean{
			//lets loop to find if each row is used or not and if it is, go deeper
			for(var i=0; i<this.sectors; i++){ // loop through each sector
				for(var j=0; j<this.blocks; j++){ // loop through each block
					var whatIfound = _FileSystem.read(0,i,j);
					if(filename === whatIfound.substring(4)){
						return true;
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