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
            var freeLocationForPointer = this.findFreeSpaceOnTheTSB(true);
            var freeLocationForData = this.findFreeSpaceOnTheTSB(true);
            _FileSystem.write(freeLocationForPointer.substring(0, 1), freeLocationForPointer.substring(1, 2), freeLocationForPointer.substring(2, 3), "1" + freeLocationForData + TSOS.Utils.hexEncode(fileName));
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
        FileSystemManager.prototype.reserveTSBSpace = function (i, j, k) {
            _FileSystem.write(i, j, k, "1---------------------------------------------------------------");
        };
        FileSystemManager.prototype.findFreeSpaceOnTheTSB = function (reserve) {
            //type: 0 = pointer, 1= data, 2=swap?
            for (var i = 0; i < this.tracks; i++) {
                for (var j = 0; j < this.sectors; j++) {
                    for (var k = 0; k < this.blocks; k++) {
                        var contents = this.checkIfLocationUsed(i, j, k);
                        if (!contents) {
                            if (reserve) {
                                this.reserveTSBSpace(i, j, k);
                                return "" + i + j + k; // give back first found free space ;)
                            }
                            else {
                                return "" + i + j + k; // give back first found free space ;)
                            }
                        }
                    }
                }
            }
            //umm.... no free space left?
            return "No free space left";
        };
        FileSystemManager.prototype.checkIfLocationUsed = function (i, j, k) {
            //CHECK IF THE BIT IS 1
            var content = _FileSystem.read(i, j, k);
            if (content !== null && content.substring(0, 1) === "1") {
                return true;
            }
            else {
                return false;
            }
        };
        FileSystemManager.prototype.checkIfFileExists = function (filename) {
            //lets loop to find if each row is used or not and if it is, go deeper
            for (var i = 0; i < this.tracks; i++) {
                for (var j = 0; j < this.sectors; j++) {
                    for (var k = 0; k < this.blocks; k++) {
                        var whatIfound = _FileSystem.read(i, j, k);
                        if (TSOS.Utils.hexEncode(filename) === whatIfound.substring(4)) {
                            return true;
                        }
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
