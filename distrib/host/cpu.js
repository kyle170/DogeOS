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
        function Cpu(PC, Acc, Xreg, Yreg, Zflag, isExecuting) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
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
            var operationDecimal = operation.GetDecimal(); // from the byte representation to the decimal... its easier to work like this
            switch (operationDecimal) {
                case Cpu.OP_A9:
                    this.LoadTheAccumulator();
                    break;
                case Cpu.OP_AD:
                    this.LoadAccumulatedRAM();
                    break;
                case Cpu.OP_6D:
                    this.AddCarry();
                    break;
                case Cpu.OP_A2:
                    this.LoadXConstructor();
                    break;
                case Cpu.OP_AE:
                    this.LoadXRAM();
                    break;
                case Cpu.OP_A0:
                    this.LoadYConstructor();
                    break;
                case Cpu.OP_AC:
                    this.LoadYRAM();
                    break;
                case Cpu.OP_EA:
                    this.NoOperation();
                    break;
                case Cpu.OP_00:
                    this.DoneWithExecution();
                    break;
                case Cpu.OP_EC:
                    this.Compare();
                    break;
                case Cpu.OP_D0:
                    this.Branch();
                    break;
                case Cpu.OP_EE:
                    this.Incriment();
                    break;
                case Cpu.OP_FF:
                    this.SystemCall();
                    break;
                default:
                    //what do here?... halp!
                    //something.jpg
                    break;
            }
        };
        //begin the methods that control the OP code calls
        Cpu.prototype.LoadTheAccumulator = function () {
        };
        Cpu.prototype.LoadAccumulatedRAM = function () {
        };
        Cpu.prototype.AddCarry = function () {
        };
        Cpu.prototype.LoadXConstructor = function () {
        };
        Cpu.prototype.LoadXRAM = function () {
        };
        Cpu.prototype.LoadYConstructor = function () {
        };
        Cpu.prototype.LoadYRAM = function () {
        };
        Cpu.prototype.NoOperation = function () {
        };
        Cpu.prototype.DoneWithExecution = function () {
        };
        Cpu.prototype.Compare = function () {
        };
        Cpu.prototype.Branch = function () {
        };
        Cpu.prototype.Incriment = function () {
        };
        Cpu.prototype.SystemCall = function () {
        };
        //begin the OP codes here (static cause we DO NOT want them changing)
        Cpu.OP_A9 = 169;
        Cpu.OP_AD = 173;
        Cpu.OP_8D = 141;
        Cpu.OP_6D = 109;
        Cpu.OP_A2 = 162;
        Cpu.OP_AE = 174;
        Cpu.OP_A0 = 160;
        Cpu.OP_AC = 172;
        Cpu.OP_EA = 234;
        Cpu.OP_00 = 0; // duh...what else were you expecting here?
        Cpu.OP_EC = 236;
        Cpu.OP_D0 = 208;
        Cpu.OP_EE = 238;
        Cpu.OP_FF = 255;
        return Cpu;
    }());
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
