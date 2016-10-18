var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
            this.memoryTotalSize = _Memory.MemorySize;
        }
        MemoryManager.prototype.init = function () {
        };
        MemoryManager.prototype.writeToMemory = function (ProcessControlBlock, MemoryLocation, dataToWrite) {
            // write the data to memory, checking if it is within bounds first
            var violatesBounds = false;
            if (MemoryLocation < ProcessControlBlock.BaseReg || MemoryLocation > ProcessControlBlock.LimReg) {
                violatesBounds = true;
            }
            if (!violatesBounds) {
                return _Memory.setByte((ProcessControlBlock.BaseReg + MemoryLocation), dataToWrite); // send command to setByte to write data at location with data within its bounds
            }
            else {
                _StdOut.putText("Memory Bounds Violation Error!"); // return fatal error if its outside (memory seeking missile program)
            }
        };
        MemoryManager.prototype.readFromMemory = function (ProcessControlBlock, MemoryLocation) {
            // read the data from memory, again, checking if there is a bounds error!
            var violatesBounds = false;
            if (MemoryLocation < ProcessControlBlock.BaseReg || MemoryLocation > ProcessControlBlock.LimReg) {
                violatesBounds = true;
            }
            if (!violatesBounds) {
                return _Memory.getByte(ProcessControlBlock + MemoryLocation);
            }
            else {
                _StdOut.putText("Memory Bounds Violation Error!"); // return fatal error if its outside (memory seeking missile program)
            }
        };
        MemoryManager.prototype.alloicateMemoryForPCB = function (ProcessControlBlock, ProgramData) {
            // program comes in as a string of doubles... we must write it in the memory!
        };
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
