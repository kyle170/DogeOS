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
            if ((ProcessControlBlock.BaseReg + MemoryLocation) < ProcessControlBlock.BaseReg || (ProcessControlBlock.BaseReg + MemoryLocation) > ProcessControlBlock.LimReg) {
                violatesBounds = true;
            }
            if (!violatesBounds) {
                return _Memory.setByte((ProcessControlBlock.BaseReg + MemoryLocation), dataToWrite); // send command to setByte to write data at location with data within its bounds
            }
            else {
                _StdOut.putText("Memory Bounds Violation Error! - Tying to write: " + (ProcessControlBlock.BaseReg + MemoryLocation)); // return fatal error if its outside (memory seeking missile program)
                _StdOut.advanceLine();
            }
        };
        MemoryManager.prototype.readFromMemory = function (ProcessControlBlock, MemoryLocation) {
            // read the data from memory, again, checking if there is a bounds error!
            var violatesBounds = false;
            if ((ProcessControlBlock.BaseReg + MemoryLocation) < ProcessControlBlock.BaseReg || (ProcessControlBlock.BaseReg + MemoryLocation) > ProcessControlBlock.LimReg) {
                violatesBounds = true;
            }
            if (!violatesBounds) {
                return _Memory.getByte(ProcessControlBlock.BaseReg + MemoryLocation);
            }
            else {
                _StdOut.putText("Memory Bounds Violation Error! - Tying to read: " + (ProcessControlBlock.BaseReg + MemoryLocation)); // return fatal error if its outside (memory seeking missile program)
                _StdOut.advanceLine();
            }
        };
        MemoryManager.prototype.alloicateMemoryForProgram = function (ProcessControlBlock, ProgramData, prio) {
            // program comes in as a string of doubles... we must write it in the memory!
            //_Memory.clearMem(); // clear anything that was previously in there
            if (_Formatted && (TSOS.PCB.CPID * 256) >= _Memory.memorySize) {
                var str = "";
                for (var i = 0; i < ProgramData.length; i++) {
                    str += ProgramData[i];
                }
                console.log(str);
                _krnFileSystemDriver.consoleISR("write", "swap1", str, true);
            }
            else {
                ProcessControlBlock.BaseReg = (ProcessControlBlock.PID * 256); //set base limit
                ProcessControlBlock.LimReg = ProcessControlBlock.BaseReg + 255; // set max limit
                ProcessControlBlock.Priority = prio; // sets priority
                for (var i = 0; i < (ProcessControlBlock.LimReg - ProcessControlBlock.BaseReg); i++) {
                    var data = ProgramData[i];
                    if (data !== undefined) {
                        _Memory.setByte(ProcessControlBlock.BaseReg + i, data); // set the data
                    }
                    else {
                        _Memory.setByte(ProcessControlBlock.BaseReg + i, '00'); // set a blank (nothing)
                    }
                }
            }
            TSOS.Control.memoryUpdate();
        };
        MemoryManager.prototype.clearAllMemory = function () {
            for (var i = 0; i < this.memoryTotalSize; i++) {
                _Memory.setByte(i, '00');
            }
            TSOS.Control.memoryUpdate();
        };
        MemoryManager.prototype.removeProgramsMemory = function (ProcessControlBlock) {
            var base = ProcessControlBlock.BaseReg;
            var lim = ProcessControlBlock.LimReg;
            for (var i = base; i < lim; i++) {
                _Memory.setByte(i, '00');
            }
        };
        MemoryManager.prototype.PageFault = function () {
            //save the old pcb
            // get the new pcb ready
        };
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
