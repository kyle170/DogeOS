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
            //TODO
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

        private deconstructFile(t, s, b){
            //TODO
        }
    }

}