var TSOS;
(function (TSOS) {
    var FileSystem = (function () {
        function FileSystem(tracks, // the first one
            sectors, // cant have sectors without tracks
            blocks, // blocks are on sectors
            blockSize, // soo, how big do we want it?
            headerSize // should be something like 3 righjt
            ) {
            this.tracks = tracks;
            this.sectors = sectors;
            this.blocks = blocks;
            this.blockSize = blockSize;
            this.headerSize = headerSize;
        }
        FileSystem.prototype.read = function (track, sector, block) {
            return localStorage.getItem(track + '-' + sector + '-' + block);
            //I think I did htm5 correctly OwO
        };
        FileSystem.prototype.write = function (track, sector, block, data) {
            localStorage.setItem(track + '-' + sector + '-' + block, data);
            //I think I did htm5 correctly OwO
        };
        return FileSystem;
    }());
    TSOS.FileSystem = FileSystem;
})(TSOS || (TSOS = {}));
