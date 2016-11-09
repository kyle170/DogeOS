var TSOS;
(function (TSOS) {
    var CPUScheduler = (function () {
        function CPUScheduler() {
            // presets on boot
            this.quantum = 6; // default quantum
            this.schedulingType = "ROUND_ROBIN";
        }
        CPUScheduler.prototype.init = function () {
            // nothing here yet
        };
        CPUScheduler.prototype.schedule = function () {
            // nothing here yet
        };
        CPUScheduler.prototype.contextSwitch = function () {
            if (_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() > 0) {
                var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING";
                this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
            }
        };
        CPUScheduler.prototype.ScheduleFirstComeFirstServe = function () {
            // nothing here yet
        };
        CPUScheduler.prototype.ScheduleRoundRobbin = function () {
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
