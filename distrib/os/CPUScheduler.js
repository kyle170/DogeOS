var TSOS;
(function (TSOS) {
    var CPUScheduler = (function () {
        function CPUScheduler() {
            // presets on boot
            this.quantum = 4;
            this.schedulingType = "Quantium";
        }
        CPUScheduler.prototype.init = function () {
            // nothing here yet
        };
        CPUScheduler.prototype.schedule = function () {
            if (_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() > 0) {
                var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING";
                this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
                _CPU.isExecuting = true;
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
