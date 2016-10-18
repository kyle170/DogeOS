var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager(maxProcesses) {
            this.memorySize = _Memory.getSize();
            this.numOfBlocks = this.memorySize / maxProcesses;
            this.allocated = new Array(maxProcesses); // we eventually want to set the max amount of processes we can run... right?
            for (var i = 0; i < this.allocated.length; i++) {
                this.allocated[i] = -1;
            }
        }
        MemoryManager.prototype.init = function () {
            // nothing here yet!
        };
        MemoryManager.prototype.read = function (pcb, memloc) {
            var byteMem = ""; // resetr the byteMem just to be safe
            if (memloc >= 0 && memloc < 256) {
                byteMem = _Memory.getByte(pcb.baseRegister + memloc); //get the byte from memory at the location of base + location (BLOCK OFFSET)
            }
            else {
                _StdOut.putText("Memory Access Error!"); // ruuu roo... your out of bounds of the memory!
            }
            return byteMem;
        };
        MemoryManager.prototype.write = function (pcb, memloc, data) {
            if (memloc >= 0 && memloc < 256) {
                return _Memory.setByte(pcb.baseRegister + memloc, data); // write the byte to the baseRegister( start + location of the memory)
            }
            else {
                _StdOut.putText("Memory Access Error!"); // ruuu roo... your out of bounds of the memory!
            }
        };
        MemoryManager.prototype.allocateMemory = function (pcb, program) {
            for (var i = 0; i < this.allocated.length; i++) {
                if (this.allocated[i] === -1) {
                    this.allocated[i] = pcb.processID; // assign that it is allocated
                    pcb.baseRegister = i * 256; // let the pcb know the start or block of its program memory
                    pcb.limitRegister = pcb.baseRegister + 255; // its max is 255 (not 256 cause.. reasons ) above its base!
                    break; // hop out of we're all good here
                }
            }
            if (pcb.baseRegister === -1) {
                _StdOut.putText("No more space for programs");
            }
            for (var i = 0; i < 256; i++) {
                var code = program[i];
                if (code !== undefined) {
                    _Memory.setByte(pcb.baseRegister + i, code); // if we actually have something to put ion the memory, do it
                }
                else {
                    _Memory.setByte(pcb.baseRegister + i, '00'); // otherwize fill it with nothingness!
                }
            }
        };
        MemoryManager.prototype.deallocateMemory = function (pcb) {
            // going to wait on this to do it!
        };
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
