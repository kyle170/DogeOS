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
            this.readyQueue.enqueue(this.ResidentList[ProcessID]); // send her off
            _CPU.isExecuting = true;
        };
        ProcessManager.prototype.runall = function () {
            // nothing here yet
        };
        ProcessManager.prototype.kill = function (pid) {
            // nothing here yet
            // TODO: Stop execution, (KEEP IS_EXECUTING RUNNING), deallicate memory
        };
        ProcessManager.prototype.getRunning = function () {
            var runningProcesses = [];
            for (var i = 0; this.ResidentList.length; i++) {
                var tempPCB = this.ResidentList[i];
                if (tempPCB.PS === "Running" || tempPCB.PS === "Waiting") {
                    runningProcesses.push(tempPCB);
                }
            }
            return runningProcesses;
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
