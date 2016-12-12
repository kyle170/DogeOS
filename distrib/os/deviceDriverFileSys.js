///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TSOS;
(function (TSOS) {
    var DeviceDriverFileSys = (function (_super) {
        __extends(DeviceDriverFileSys, _super);
        function DeviceDriverFileSys() {
            _super.call(this, this.krnFSDriverEntry, this.consoleISR);
        }
        DeviceDriverFileSys.prototype.krnFSDriverEntry = function () {
            // Initialization routine for this, the kernel-mode File System Device Driver.
            this.status = "loaded";
            // More?
        };
        DeviceDriverFileSys.prototype.consoleISR = function (parameter, data) {
            if (parameter = "format") {
                _FileSystemManager.format();
                TSOS.Control.fileSystemUpdate();
            }
            else if (parameter = "ls") {
                _FileSystemManager.listDirectory();
            }
            else if (parameter = "create") {
            }
            else if (parameter = "read") {
            }
            else if (parameter = "write") {
            }
            else if (parameter = "delete") {
            }
            else {
            }
        };
        return DeviceDriverFileSys;
    }(TSOS.DeviceDriver));
    TSOS.DeviceDriverFileSys = DeviceDriverFileSys;
})(TSOS || (TSOS = {}));
