var TSOS;
(function (TSOS) {
    var PCB = (function () {
        function PCB(Prio) {
            this.Prio = Prio;
            this.Pid = PCB.CPid++;
            this.Acc = 0;
            this.XReg = 0;
            this.YReg = 0;
            this.ZFlag = 0;
            this.PC = 0;
            this.PS = "NEW";
            this.BaseReg = -1;
            this.LimReg = -1;
        }
        PCB.prototype.update_PCB = function (PC, Acc, XReg, YReg, Zflag) {
            this.PC = pc;
            this.acc = Acc;
            this.XReg = XReg;
            this.YReg = YReg;
            this.ZFlag = Zflag;
        };
        // allow these to be accessed by other class methods
        PCB.CPid = 0; // want this globally accessable... start with 0
        return PCB;
    }());
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
