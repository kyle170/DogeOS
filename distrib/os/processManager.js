var TSOS;
(function (TSOS) {
    var ProcessManager = (function () {
        function ProcessManager(maxProcesses) {
            this.maxProcesses = maxProcesses;
        }
        //Initalize the Process Manager class
        ProcessManager.prototype.init = function () {
            this.processes = [null];
        };
        //This loads the PCB (Process Control Block, adn sees if the max defined value is exceeded...if not it assigns a process number to the pcb and alloicates the memoryu for it)
        ProcessManager.prototype.load = function (program, priority) {
            var pcb = new TSOS.PCB(priority);
            this.processes[pcb.processID] = pcb;
            _MemoryManager.allocateMemory(pcb, program);
            return pcb.processID;
        };
        //checks of the PID already exists
        ProcessManager.prototype.doesProcessExist = function (pid) {
            return (this.processes[pid] !== undefined || this.processes[pid] !== null);
        };
        //this gets the PID from the PCB
        ProcessManager.prototype.getPCB = function (pid) {
            return this.processes[pid];
        };
        return ProcessManager;
    }());
    TSOS.ProcessManager = ProcessManager;
})(TSOS || (TSOS = {}));
