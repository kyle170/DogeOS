var TSOS;
(function (TSOS) {
    var FileSystemManager = (function () {
        function FileSystemManager() {
            this.tracks = _FileSystem.tracks;
            this.sectors = _FileSystem.sectors;
            this.blocks = _FileSystem.blocks;
            this.blockSize = _FileSystem.blockSize;
            this.headerSize = _FileSystem.headerSize;
        }
        FileSystemManager.prototype.format = function () {
            var blankBlock = '0';
            for (var i = 0; i < this.blockSize - 1; i++) {
                blankBlock += '-';
            }
            for (var i = 0; i < this.tracks; i++) {
                for (var j = 0; j < this.sectors; j++) {
                    for (var k = 0; k < this.blocks; k++) {
                        _FileSystem.write(i, j, k, blankBlock);
                    }
                }
            }
        };
        FileSystemManager.prototype.ls = function (fileName) {
            //TODO
        };
        FileSystemManager.prototype.create = function (fileName) {
            //TODO
        };
        FileSystemManager.prototype.read = function (fileName, data) {
            //TODO
        };
        FileSystemManager.prototype.write = function (fileName) {
            //TODO
        };
        FileSystemManager.prototype.deleteFile = function (fileName) {
            //TODO
        };
        FileSystemManager.prototype.takeApartFile = function (t, s, b) {
            //TODO
        };
        return FileSystemManager;
    }());
    TSOS.FileSystemManager = FileSystemManager;
})(TSOS || (TSOS = {}));
