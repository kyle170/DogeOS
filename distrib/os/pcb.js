var TSOS;
(function (TSOS) {
    var PCB = (function () {
        function PCB() {
            this.PID = PCB.CPID++;
            this.Acc = 0;
            this.XReg = 0;
            this.YReg = 0;
            this.ZFlag = 0;
            this.PC = 0;
            this.PS = "NEW";
            this.BaseReg = -1;
            this.LimReg = -1;
            this.IsInSwap = false;
            this.SwapLocation = '';
            this.Priority = 0;
        }
        PCB.prototype.update_PCB = function (PC, Acc, XReg, YReg, ZFlag) {
            this.PC = PC;
            this.Acc = Acc;
            this.XReg = XReg;
            this.YReg = YReg;
            this.ZFlag = ZFlag;
        };
        // allow these to be accessed by other class methods
        PCB.CPID = 0; // want this globally accessable... start with 0
        return PCB;
    }());
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
