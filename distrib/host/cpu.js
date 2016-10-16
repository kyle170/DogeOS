///<reference path="../globals.ts" />
/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */
var TSOS;
(function (TSOS) {
    var Cpu = (function () {
        function Cpu(PC, Acc, Xreg, Yreg, Zflag, isExecuting, 
            //begin the OP codes here (static cause we DO NOT want them changing)
            OP_A9, OP_AD, OP_8D, OP_6D, OP_A2, OP_AE, OP_A0, OP_AC, OP_EA, OP_00, // duh...what else were you expecting here?
            OP_EC, OP_D0, OP_EE, OP_FF) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            if (OP_A9 === void 0) { OP_A9 = 169; }
            if (OP_AD === void 0) { OP_AD = 173; }
            if (OP_8D === void 0) { OP_8D = 141; }
            if (OP_6D === void 0) { OP_6D = 109; }
            if (OP_A2 === void 0) { OP_A2 = 162; }
            if (OP_AE === void 0) { OP_AE = 174; }
            if (OP_A0 === void 0) { OP_A0 = 160; }
            if (OP_AC === void 0) { OP_AC = 172; }
            if (OP_EA === void 0) { OP_EA = 234; }
            if (OP_00 === void 0) { OP_00 = 0; }
            if (OP_EC === void 0) { OP_EC = 236; }
            if (OP_D0 === void 0) { OP_D0 = 208; }
            if (OP_EE === void 0) { OP_EE = 238; }
            if (OP_FF === void 0) { OP_FF = 255; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
            this.OP_A9 = OP_A9;
            this.OP_AD = OP_AD;
            this.OP_8D = OP_8D;
            this.OP_6D = OP_6D;
            this.OP_A2 = OP_A2;
            this.OP_AE = OP_AE;
            this.OP_A0 = OP_A0;
            this.OP_AC = OP_AC;
            this.OP_EA = OP_EA;
            this.OP_00 = OP_00;
            this.OP_EC = OP_EC;
            this.OP_D0 = OP_D0;
            this.OP_EE = OP_EE;
            this.OP_FF = OP_FF;
        }
        Cpu.prototype.init = function () {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        };
        Cpu.prototype.cycle = function () {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            // I fear what I have to do here @_@
        };
        // this is how the 6502 will know what to do on each op code
        Cpu.prototype.ExecuteInstruction = function (operation) {
            switch (operation) {
                case this.OP_A9:
                    //this.; 
                    break;
                case this.OP_AD:
                    //this.; 
                    break;
                case this.OP_6D:
                    //this.(); 
                    break;
                case this.OP_A2:
                    //this.(); 
                    break;
                case this.OP_AE:
                    //this.(); 
                    break;
                case this.OP_A0:
                    //this.(); 
                    break;
                case this.OP_AC:
                    //this.(); 
                    break;
                case this.OP_EA:
                    //this.(); 
                    break;
                case this.OP_00:
                    //this.(); 
                    break;
                case this.OP_EC:
                    //this.(); 
                    break;
                case this.OP_D0:
                    //this.(); 
                    break;
                case this.OP_EE:
                    //this.(); 
                    break;
                case this.OP_FF:
                    //this.(); 
                    break;
                default:
                    //what do here?... halp!
                    //something.jpg
                    break;
            }
        };
        return Cpu;
    }());
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
