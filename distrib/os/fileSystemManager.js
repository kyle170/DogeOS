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
            //TODO
        };
        FileSystemManager.prototype.createFile = function (fileName) {
            //TODO
        };
        FileSystemManager.prototype.readFile = function (fileName) {
            //TODO
        };
        FileSystemManager.prototype.writeFile = function (fileName, data) {
            //TODO
        };
        FileSystemManager.prototype.deleteFile = function (fileName) {
            //TODO
        };
        FileSystemManager.prototype.doesFileExist = function (fileName) {
            //TODO
        };
        FileSystemManager.prototype.deconstructFile = function (t, s, b) {
            //TODO
        };
        return FileSystemManager;
    }());
    TSOS.FileSystemManager = FileSystemManager;
})(TSOS || (TSOS = {}));
