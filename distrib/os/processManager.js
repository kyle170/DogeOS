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
            var pcb = new TSOS.PCB(priority); // initialize the PCB
            this.processes[pcb.processID] = pcb; // set the PCB job
            _MemoryManager.allocateMemory(pcb, program); // alloicate the memory to the pcb (bring in the program)
            return pcb.processID; // return a sucessful int to the shell!
        };
        //checks of the PID already exists
        ProcessManager.prototype.doesProcessExist = function (pid) {
            //now used as a shell commmand to see whats loaded!
            if (this.processes[pid] !== null || this.processes[pid] !== undefined) {
                return true;
            }
            else {
                return false; // not here
            }
        };
        //this gets the PID from the PCB
        ProcessManager.prototype.getPCB = function (pid) {
            return this.processes[pid];
        };
        return ProcessManager;
    }());
    TSOS.ProcessManager = ProcessManager;
})(TSOS || (TSOS = {}));
