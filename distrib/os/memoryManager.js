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
        MemoryManager.prototype.read = function (pcb, memloc) {
            var byteMem = "";
            if (memloc >= 0 && memloc < 256) {
                byteMem = _Memory.getByte(pcb.baseRegister + memloc);
            }
            else {
            }
            return byteMem;
        };
        MemoryManager.prototype.write = function (pcb, memloc, data) {
            if (memloc >= 0 && memloc < 256) {
                return _Memory.setByte(pcb.baseRegister + memloc, data);
            }
            else {
            }
        };
        MemoryManager.prototype.allocateMemory = function (pcb, program) {
            for (var i = 0; i < this.allocated.length; i++) {
                if (this.allocated[i] === -1) {
                    this.allocated[i] = pcb.processID;
                    pcb.baseRegister = i * 256;
                    pcb.limitRegister = pcb.baseRegister + 255;
                    break;
                }
            }
            if (pcb.baseRegister === -1) {
                // TODO Error handling no more space to allocate
                alert("BASE REGISTER NOT SET");
            }
            for (var i = 0; i < 256; i++) {
                var code = program[i];
                _Memory.setByte(pcb.baseRegister + i, (code !== undefined) ? code : '00');
            }
        };
        MemoryManager.prototype.deallocateMemory = function (pcb) {
            // going to wait on this to do it!
        };
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
