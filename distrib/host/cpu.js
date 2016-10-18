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
        function Cpu(PC, // program counter
            Acc, // accumulator
            Xreg, // x register nuber	
            Yreg, // Y register number
            Zflag, // ZEE FLAG (mostly usless but whatever)
            isExecuting, // status.... do I have something to do or just sit here?	
            currentPCB // yes... this contains the PCB.... questions?
            ) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            if (currentPCB === void 0) { currentPCB = null; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
            this.currentPCB = currentPCB;
        }
        Cpu.prototype.init = function () {
            // nothing here so far...
        };
        Cpu.prototype.loadFromPCB = function () {
            //things are loaded... made sure they're current
            this.PC = this.currentPCB.programCounter;
            this.Acc = this.currentPCB.acc;
            this.Xreg = this.currentPCB.XRegister;
            this.Yreg = this.currentPCB.YRegister;
            this.Zflag = this.currentPCB.ZFlag;
        };
        Cpu.prototype.runProcess = function (pid) {
            //set the PCB with the PID of the process
            this.currentPCB = _ProcessManager.getPCB(pid);
            if (this.currentPCB.processState === TSOS.ProcessState.Terminated) {
                _StdOut.putText('This process has already been terminated or doesnt exist');
            }
            else {
                this.currentPCB.processState = TSOS.ProcessState.Running;
                this.loadFromPCB();
                this.isExecuting = true;
            }
        };
        Cpu.prototype.loadProgram = function (pcb) {
            //load the program and set the parameters for the PCB
            this.currentPCB = pcb;
            this.Acc = pcb.acc;
            this.PC = pcb.programCounter;
            this.Xreg = pcb.XRegister;
            this.Yreg = pcb.YRegister;
            this.Zflag = pcb.ZFlag;
        };
        Cpu.prototype.updatePCB = function () {
            //UPDATE THE PCB IF ITS NOT EMPYTY
            if (this.currentPCB !== null) {
                this.currentPCB.update(this.PC, this.Acc, this.Xreg, this.Yreg, this.Zflag);
            }
        };
        Cpu.prototype.cycle = function () {
            this.PC = this.PC % (this.currentPCB.limitRegister - this.currentPCB.baseRegister);
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here. 
            if (this.currentPCB !== null && this.isExecuting) {
                if (_MemoryManager.read(this.currentPCB, this.PC) == 'A9') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'AD') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == '8D') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == '6D') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'A2') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'AE') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'A0') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'AC') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'EC') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'D0') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'EE') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'FF') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'EA') {
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == '00') {
                }
                else {
                }
            }
            if (this.currentPCB !== null) {
                this.updatePCB();
            }
        }; // End of cycle
        return Cpu;
    }());
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
