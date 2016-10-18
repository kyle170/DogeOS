var TSOS;
(function (TSOS) {
    var ProcessManager = (function () {
        function ProcessManager() {
            // nothing here yet
        }
        ProcessManager.prototype.init = function () {
            //creates a blank table to start with
            this.processes = [null];
        };
        ProcessManager.prototype.load = function (programData) {
            //load the program into the memory and return a PID to work with
            var ProcessControlBlock = new TSOS.PCB();
            this.processes[pcb.PID] = ProcessControlBlock;
            _MemoryManager.alloicateMemoryForProgram(ProcessControlBlock, programData);
            return ProcessControlBlock.PID;
        };
        ProcessManager.prototype.getProcessControlBlock = function (ProcessID) {
            //simply just grabs the process control block PID
            return this.processes[ProcessID];
        };
        return ProcessManager;
    }());
    TSOS.ProcessManager = ProcessManager;
})(TSOS || (TSOS = {}));
