var TSOS;
(function (TSOS) {
    var PCB = (function () {
        function PCB(priority) {
            this.priority = priority;
            this.processID = PCB.currentProcessId++;
            this.acc = 0;
            this.XRegister = 0;
            this.YRegister = 0;
            this.ZFlag = 0;
            this.programCounter = 0;
            this.processState = "NEW";
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
        PCB.currentProcessId = 0; // want this globally accessable
        return PCB;
    }());
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
