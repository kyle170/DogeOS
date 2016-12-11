module TSOS {

    export class FileSystem {

        constructor(
                public tracks:     number, // the first one
                public sectors:    number, // cant have sectors without tracks
                public blocks:     number, // blocks are on sectors
                public blockSize:  number, // soo, how big do we want it?
                public headerSize: number  // should be something like 3 right?
        ){}

        public read(track, sector, block){
            //TODO
        }

        public write(track, sector, block, data){
            //TODO
        }

    }

}