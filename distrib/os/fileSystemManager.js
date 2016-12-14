///<reference path="../utils.ts" />
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
            var track = 0;
            var sector = 0;
            var block = 2;
            _FileSystem.write(track, sector, block, "1101" + TSOS.Utils.hexEncode(fileName));
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
        FileSystemManager.prototype.checkIfFileExists = function (filename) {
            //lets loop to find if each row is used or not and if it is, go deeper
            for (var i = 0; i < this.sectors; i++) {
                for (var j = 0; j < this.blocks; j++) {
                    var whatIfound = _FileSystem.read(0, i, j);
                    if (filename === whatIfound.substring(4)) {
                        return true;
                    }
                }
            }
            return false;
        };
        FileSystemManager.prototype.takeApartFile = function (t, s, b) {
            //read the TSB block!
            var fileData = _FileSystem.read(t, s, b);
            var usageFlag = fileData.substring(0, 1);
            var tsbAddress = fileData.substring(1, 4);
            var fileContents = fileData.substring(4);
            return [usageFlag, tsbAddress, fileContents];
        };
        return FileSystemManager;
    }());
    TSOS.FileSystemManager = FileSystemManager;
})(TSOS || (TSOS = {}));
