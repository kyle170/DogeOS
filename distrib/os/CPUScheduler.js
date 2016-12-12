var TSOS;
(function (TSOS) {
    var CPUScheduler = (function () {
        function CPUScheduler() {
            // presets on boot
            this.quantum = 6; // default quantum
            this.pCounter = 1; // set default counter
            this.schedulingType = "ROUND_ROBIN";
        }
        CPUScheduler.prototype.init = function () {
            // nothing here yet
        };
        CPUScheduler.prototype.clearPCB = function () {
            this.CurrentPCBProgram = null;
            this.pCounter = 0;
        };
        CPUScheduler.prototype.schedule = function () {
            // nothing here yet
            if (this.schedulingType === "ROUND_ROBIN" || this.schedulingType === "FCFS") {
                // do round robbin
                this.ScheduleRoundRobbin();
            }
            else {
                //WTFIDKBBQ
                this.SchedulePrio();
            }
        };
        CPUScheduler.prototype.contextSwitch = function () {
            if (_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() > 0) {
                var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING";
                this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
            }
            else if (_CPU.currentPCB !== null && _ProcessManager.readyQueue.getSize() > 0) {
                _CPU.updatePCB();
                var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING";
                // TAKE CURRENTLY RUNNING OFF AND PUSH BACK TO READY!
                this.CurrentPCBProgram.PS = "WAITING";
                _ProcessManager.readyQueue.enqueue(this.CurrentPCBProgram);
                this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
            }
        };
        CPUScheduler.prototype.ScheduleRoundRobbin = function () {
            if (_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() > 0) {
                var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING";
                this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
                _CPU.isExecuting = true;
            }
            else if (_CPU.currentPCB !== null && _ProcessManager.readyQueue.getSize() > 0) {
                if (this.pCounter >= this.quantum) {
                    this.pCounter = 1;
                    _Kernel.krnInterruptHandler("CONTEXT_SWITCH");
                }
            }
            else {
            }
        };
        CPUScheduler.prototype.SchedulePrio = function () {
            if (_CPU.currentPCB === null) {
            }
            if (_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() > 0) {
                var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING";
                this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
                _CPU.isExecuting = true;
            }
            else if (_CPU.currentPCB !== null && _ProcessManager.readyQueue.getSize() > 0) {
                if (this.pCounter >= this.quantum) {
                    this.pCounter = 1;
                    _Kernel.krnInterruptHandler("CONTEXT_SWITCH");
                }
            }
            else {
            }
        };
        CPUScheduler.prototype.QuantumGet = function () {
            return this.quantum;
        };
        CPUScheduler.prototype.QuantiumSet = function (Quantum) {
            this.quantum = Quantum;
        };
        CPUScheduler.prototype.schedulingModeSet = function (mode) {
            this.schedulingType = mode;
        };
        return CPUScheduler;
    }());
    TSOS.CPUScheduler = CPUScheduler;
})(TSOS || (TSOS = {}));
