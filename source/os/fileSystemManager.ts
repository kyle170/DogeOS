module TSOS {

    export class FileSystemManager{

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
			TSOS.Control.fileSystemUpdate();
        }

        public createFile(fileName): string {
            //TODO
        }

        public readFile(fileName): string {
            //TODO
        }

        public writeFile(fileName, data): string {
            //TODO
        }

        public deleteFile(fileName): string {
            //TODO
        }

        private doesFileExist(fileName): boolean {
            //TODO
        }

        private takeApartFile(t, s, b){
            //TODO
        }
    }

}