var TSOS;
(function (TSOS) {
    (function (ProcessState) {
        ProcessState[ProcessState["New"] = 0] = "New";
        ProcessState[ProcessState["Ready"] = 1] = "Ready";
        ProcessState[ProcessState["Waiting"] = 2] = "Waiting";
        ProcessState[ProcessState["Halted"] = 3] = "Halted";
        ProcessState[ProcessState["Running"] = 4] = "Running";
        ProcessState[ProcessState["Terminated"] = 5] = "Terminated";
    })(TSOS.ProcessState || (TSOS.ProcessState = {}));
    var ProcessState = TSOS.ProcessState;
    ; // condense and rince
    var PCB = (function () {
        function PCB(priority) {
            this.priority = priority;
            this.processID = PCB.currentProcessId++;
            this.acc = 0;
            this.XRegister = 0;
            this.YRegister = 0;
            this.ZFlag = 0;
            this.programCounter = 0;
            this.processState = TSOS.ProcessState.New;
            this.baseRegister = -1;
            this.limitRegister = -1;
        }
        PCB.prototype.update = function (pc, Acc, XReg, YReg, Zflag) {
            this.programCounter = pc;
            this.acc = Acc;
            this.XRegister = XReg;
            this.YRegister = YReg;
            this.ZFlag = Zflag;
        };
        PCB.currentProcessId = 1; // want this globally accessable
        return PCB;
    }());
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
