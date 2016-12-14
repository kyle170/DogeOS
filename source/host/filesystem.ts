module TSOS {
    export class FileSystem {
        constructor(
                public tracks:     number, // the first one
                public sectors:    number, // cant have sectors without tracks
                public blocks:     number, // blocks are on sectors
                public blockSize:  number, // soo, how big do we want it?
                public headerSize: number  // should be something like 3 righjt
        ){}

        public read(track, sector, block){
            return localStorage.getItem(track + '-' + sector + '-' + block);
			//I think I did htm5 correctly OwO
        }

        public write(track, sector, block, data){
            localStorage.setItem(track + '-' + sector + '-' + block, data);
			//I think I did htm5 correctly OwO
        }
    }
}