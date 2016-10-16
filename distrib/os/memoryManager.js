var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager(maxProcesses) {
            this.memorySize = _Memory.getSize();
            this.numOfBlocks = this.memorySize / maxProcesses;
            this.allocated = new Array(maxProcesses);
            for (var i = 0; i < this.allocated.length; i++) {
                this.allocated[i] = -1;
            }
        }
        MemoryManager.prototype.init = function () {
        };
        MemoryManager.prototype.read = function (pcb, loc) {
        };
        MemoryManager.prototype.write = function (pcb, loc, data) {
        };
        MemoryManager.prototype.allocateMemory = function (pcb, program) {
        };
        MemoryManager.prototype.deallocateMemory = function (pcb) {
        };
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
