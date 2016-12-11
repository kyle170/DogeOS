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
            //this is what loads the driver
        };
        DeviceDriverFileSys.prototype.consoleISR = function () {
            if (something = "format") {
                _FileSystemManager.formatFileSystem();
            }
            else if (params.operationType = "ls") {
                _FileSystemManager.listDirectory();
            }
            else if (params.operationType = "create") {
            }
            else if (params.operationType = "read") {
            }
            else if (params.operationType = "write") {
            }
            else if (params.operationType = "delete") {
            }
            else {
            }
        };
        return DeviceDriverFileSys;
    }(TSOS.DeviceDriver));
    TSOS.DeviceDriverFileSys = DeviceDriverFileSys;
})(TSOS || (TSOS = {}));
