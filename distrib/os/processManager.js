var TSOS;
(function (TSOS) {
    var ProcessManager = (function () {
        function ProcessManager(maxPIDs) {
            this.maxPIDs = maxPIDs;
            this.processesList = new Array();
            this.readyQueue = new TSOS.Queue(); // bringith the queue :)	
            this.ResidentList = []; // initialize the resident list array
        }
        ProcessManager.prototype.init = function () {
            //creates a blank table to start with
            this.processes = [null];
        };
        ProcessManager.prototype.load = function (programData) {
            //load the program into the memory and return a PID to work with
            if ((TSOS.PCB.CPID * 256) >= _Memory.memorySize) {
                _StdOut.putText("Not enough memory!");
                return -1;
            }
            var ProcessControlBlock = new TSOS.PCB();
            this.ResidentList[ProcessControlBlock.PID] = ProcessControlBlock;
            _MemoryManager.alloicateMemoryForProgram(ProcessControlBlock, programData);
            this.processesList[ProcessControlBlock.PID] = ProcessControlBlock.PID;
            return ProcessControlBlock.PID;
        };
        ProcessManager.prototype.runPiD = function (ProcessID) {
            var ProcessControlBlock = this.ResidentList[ProcessID];
            ProcessControlBlock.PS = "WAITING";
            this.PCBCONVERTER = this.ResidentList[ProcessID];
            this.readyQueue.enqueue(this.PCBCONVERTER); // send her off
        };
        ProcessManager.prototype.runall = function () {
            // nothing here yet
            var counter = 0;
            for (var i = 0; i < this.ResidentList.length; i++) {
                if (this.ResidentList[i].PS === "NEW") {
                    _StdOut.putText("Attempting to run PID: " + i);
                    _StdOut.advanceLine();
                    counter++;
                    this.runPiD(i);
                }
            }
            if (counter != 0) {
                return true;
            }
            else {
                return false;
            }
        };
        ProcessManager.prototype.kill = function (ProcessID) {
            // nothing here yet
            // TODO: Stop execution, (KEEP IS_EXECUTING RUNNING), deallicate memory
            var ProcessControlBlock = this.ResidentList[ProcessID];
            _MemoryManager.removeProgramsMemory(ProcessControlBlock);
            ProcessControlBlock.PS = "TERMINATED";
            if (this.readyQueue.getSize() === 0 && _CPU.currentPCB === null) {
                _CPU.isExecuting = false;
            }
        };
        ProcessManager.prototype.getRunning = function () {
            var output = "";
            for (var i = 0; i < this.ResidentList.length; i++) {
                if (this.ResidentList[i].PS == 'RUNNING' || this.ResidentList[i].PS == 'WAITING') {
                    output = output + i + ", ";
                }
            }
            return output.substring(0, output.length - 2);
        };
        ProcessManager.prototype.checkIfExists = function (ProcessID) {
            if (this.ResidentList[ProcessID] !== null && this.ResidentList[ProcessID] !== undefined) {
                return true;
            }
            else {
                return false;
            }
        };
        ProcessManager.prototype.getProcessControlBlock = function (ProcessID) {
            //simply just grabs the process control block PID
            return this.ResidentList[ProcessID];
        };
        return ProcessManager;
    }());
    TSOS.ProcessManager = ProcessManager;
})(TSOS || (TSOS = {}));
