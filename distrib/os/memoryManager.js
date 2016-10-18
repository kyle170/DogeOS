var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager() {
            this.memoryTotalSize = _Memory.memorySize;
            // nothing needed...just a palceholder
        }
        MemoryManager.prototype.init = function () {
            // nothing needed...just a palceholder
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
                return _Memory.getByte(ProcessControlBlock.BaseReg + MemoryLocation);
            }
            else {
                _StdOut.putText("Memory Bounds Violation Error!"); // return fatal error if its outside (memory seeking missile program)
            }
        };
        MemoryManager.prototype.alloicateMemoryForProgram = function (ProcessControlBlock, ProgramData) {
            // program comes in as a string of doubles... we must write it in the memory!
            _Memory.clearMem(); // clear anything that was previously in there
            var data; // create the variable that will have the data to put in the memory blocks defined
            for (var i = 0; i <= (ProcessControlBlock.LimReg - ProcessControlBlock.BaseReg); i++) {
                data = ProgramData[i];
                if (data !== undefined) {
                    _Memory.setByte(ProcessControlBlock.BaseReg + i, data); // set the data
                }
                else {
                    _Memory.setByte(ProcessControlBlock.BaseReg + i, '00'); // set a blank (nothing)
                }
            }
        };
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
