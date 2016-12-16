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
            if (!_Formatted) {
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
                _Formatted = true;
                this.create("swap1", true); // create the swap main
                this.create("swap2", true); // create the swap alt
                return true;
            }
            else {
                return false;
            }
        };
        FileSystemManager.prototype.ls = function () {
            var items = "Files Found: ";
            for (var i = 0; i < this.tracks; i++) {
                for (var j = 0; j < this.sectors; j++) {
                    for (var k = 0; k < this.blocks; k++) {
                        var whatIfound = _FileSystem.read(i, j, k);
                        if ("1" === whatIfound.substring(4, 5)) {
                            items += whatIfound.substring(5) + ", ";
                        }
                    }
                }
            }
            return items.substring(0, (items.length) - 2);
        };
        FileSystemManager.prototype.create = function (fileName, swapOverride) {
            //the way the system tells if its a pointer and not a file is if it starts with `
            if (this.checkIfFileExists(fileName) && swapOverride === null) {
                _StdOut.putText("File Already Exists!");
                return false;
            }
            else {
                var type = "1";
                var freeLocationForPointer = this.findFreeSpaceOnTheTSB(true);
                var freeLocationForData = this.findFreeSpaceOnTheTSB(true);
                if (fileName.substring(0, 4) === "swap") {
                    type = "0";
                }
                _FileSystem.write(freeLocationForPointer.substring(0, 1), freeLocationForPointer.substring(1, 2), freeLocationForPointer.substring(2, 3), "1" + freeLocationForData + type + fileName);
                return true;
            }
        };
        FileSystemManager.prototype.read = function (fileName, swapOverride) {
            if (this.checkIfFileExists(fileName) || swapOverride !== null) {
                var fileDataLocation = this.fileDataLocationFinder(fileName);
                var data = _FileSystem.read(fileDataLocation.substring(0, 1), fileDataLocation.substring(1, 2), fileDataLocation.substring(2, 3));
                if (data.substring(0, 4) !== "1---") {
                    data += this.recursiveRead(data.substring(1, 2), data.substring(2, 3), data.substring(3, 4), "");
                }
                return data.substring(5);
            }
            else {
                return "Cant read: " + fileName;
            }
        };
        FileSystemManager.prototype.recursiveRead = function (i, j, k, inputString) {
            var data = _FileSystem.read(i, j, k);
            if (data.substring(0, 4) === "1---") {
                return "" + inputString + data.substring(5);
            }
            else {
                this.recursiveRead(data.substring(1, 2), data.substring(2, 3), data.substring(3, 4), "" + data.substring(5));
            }
        };
        FileSystemManager.prototype.write = function (fileName, data) {
            if (this.checkIfFileExists(fileName)) {
                var fileDataLocation = this.fileDataLocationFinder(fileName);
                this.recursiveFileDelete(fileDataLocation.substring(0, 1), fileDataLocation.substring(1, 2), fileDataLocation.substring(2, 3)); // get rid of any previous file data!
                if (this.recursiveWrite(fileDataLocation.substring(0, 1), fileDataLocation.substring(1, 2), fileDataLocation.substring(2, 3), data)) {
                    TSOS.Control.fileSystemUpdate();
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                _StdOut.putText("Cannot Write!... File Doesnt Exist!");
                return false;
            }
        };
        FileSystemManager.prototype.recursiveWrite = function (i, j, k, data) {
            var padding = 7;
            if (data.length < this.blockSize - padding) {
                _FileSystem.write(i, j, k, "1---" + "2" + data);
            }
            else {
                var newLocation = this.findFreeSpaceOnTheTSB(true);
                var shortened = data.substring(0, this.blockSize - padding);
                var whatsleft = data.substring(this.blockSize - padding);
                _FileSystem.write(i, j, k, "1" + newLocation.substring(0, 1) + newLocation.substring(1, 2) + newLocation.substring(2, 3) + "2" + shortened);
                this.recursiveWrite(newLocation.substring(0, 1), newLocation.substring(1, 2), newLocation.substring(2, 3), whatsleft);
            }
            return true;
        };
        FileSystemManager.prototype.deleteFile = function (fileName) {
            if (this.checkIfFileExists(fileName)) {
                for (var i = 0; i < this.tracks; i++) {
                    for (var j = 0; j < this.sectors; j++) {
                        for (var k = 0; k < this.blocks; k++) {
                            var whatIfound = _FileSystem.read(i, j, k);
                            if ("1" + fileName === whatIfound.substring(4)) {
                                if (this.recursiveFileDelete(i, j, k)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            else {
                return false;
            }
        };
        FileSystemManager.prototype.reserveTSBSpace = function (i, j, k) {
            _FileSystem.write(i, j, k, "1---------------------------------------------------------------");
        };
        FileSystemManager.prototype.recursiveFileDelete = function (i, j, k) {
            var whatIfound = _FileSystem.read(i, j, k); // read the current block
            _FileSystem.write(i, j, k, "0---------------------------------------------------------------"); // write a blank block
            if (whatIfound.substring(0, 4) === "0---") {
                return true;
            }
            else {
                this.recursiveFileDelete(whatIfound.substring(1, 2), whatIfound.substring(2, 3), whatIfound.substring(3, 4));
            }
            return true;
        };
        FileSystemManager.prototype.findFreeSpaceOnTheTSB = function (reserve) {
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
        FileSystemManager.prototype.fileDataLocationFinder = function (filename) {
            for (var i = 0; i < this.tracks; i++) {
                for (var j = 0; j < this.sectors; j++) {
                    for (var k = 0; k < this.blocks; k++) {
                        var whatIfound = _FileSystem.read(i, j, k);
                        if ("1" + filename === whatIfound.substring(4)) {
                            return "" + whatIfound.substring(1, 4);
                        }
                    }
                }
            }
            return "NOT FOUND ON SYSTEM";
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
                        if ("1" + filename === whatIfound.substring(4)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        return FileSystemManager;
    }());
    TSOS.FileSystemManager = FileSystemManager;
})(TSOS || (TSOS = {}));
