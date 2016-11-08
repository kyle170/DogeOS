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
            this.processes[ProcessControlBlock.PID] = ProcessControlBlock;
            _MemoryManager.alloicateMemoryForProgram(ProcessControlBlock, programData);
            this.processesList[ProcessControlBlock.PID] = ProcessControlBlock.PID;
            return ProcessControlBlock.PID;
        };
        ProcessManager.prototype.runall = function () {
            // nothing here yet
        };
        ProcessManager.prototype.kill = function (pid) {
            // nothing here yet
        };
        ProcessManager.prototype.getRunning = function () {
            // nothing here yet
        };
        ProcessManager.prototype.checkIfExists = function (pid) {
            // nothing here yet
        };
        ProcessManager.prototype.getProcessControlBlock = function (ProcessID) {
            //simply just grabs the process control block PID
            return this.processes[ProcessID];
        };
        return ProcessManager;
    }());
    TSOS.ProcessManager = ProcessManager;
})(TSOS || (TSOS = {}));
