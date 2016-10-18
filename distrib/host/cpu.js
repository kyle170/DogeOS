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
            this.PC = this.PC % (this.currentPCB.limitRegister - this.currentPCB.baseRegister); // makin sure things are good before we begin
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here. 
            if (this.currentPCB !== null && this.isExecuting) {
                //I had a thought... why not auto incriment the process counter here instead of have it incriment every time?
                this.PC++; // because its smarter to do it here.... because reasons...
                if (_MemoryManager.read(this.currentPCB, this.PC) == 'A9') {
                    var temp = _MemoryManager.read(this.currentPCB, this.PC); // get the current infoz from memory!
                    this.Acc = parseInt(temp, 16); //make sure we're good here (http://www.w3schools.com/jsref/jsref_parseint.asp)
                    this.PC++; // add a cycle!
                    _StdOut.putText("A9 Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'AD') {
                    var temp = _MemoryManager.read(this.currentPCB, this.PC);
                    var temp2 = parseInt(temp, 16);
                    this.PC++;
                    temp = _MemoryManager.read(this.currentPCB, temp2);
                    this.Acc = parseInt(temp, 16);
                    this.PC++;
                    _StdOut.putText("AD Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == '8D') {
                    var temp = _MemoryManager.read(this.currentPCB, this.PC);
                    var temp2 = parseInt(temp, 16);
                    this.PC++;
                    _MemoryManager.write(this.currentPCB, temp2, this.Acc.toString(16)); // I think?... seems to output the right thing
                    this.PC++;
                    _StdOut.putText("8D Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == '6D') {
                    var temp = _MemoryManager.read(this.currentPCB, this.PC);
                    var temp2 = parseInt(temp, 16);
                    this.PC++;
                    temp = _MemoryManager.read(this.currentPCB, temp2);
                    this.Acc = (this.Acc + parseInt(temp, 16));
                    this.PC++;
                    _StdOut.putText("6D Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'A2') {
                    var temp = _MemoryManager.read(this.currentPCB, this.PC);
                    var temp2 = parseInt(temp, 16);
                    this.Xreg = temp2;
                    this.PC++;
                    _StdOut.putText("A2 Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'AE') {
                    var temp = _MemoryManager.read(this.currentPCB, this.PC);
                    var temp2 = parseInt(temp, 16);
                    this.PC++;
                    temp = _MemoryManager.read(this.currentPCB, temp2);
                    temp2 = parseInt(temp, 16);
                    this.Xreg = temp2;
                    this.PC++;
                    _StdOut.putText("AE Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'A0') {
                    _StdOut.putText("A0 Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'AC') {
                    _StdOut.putText("AC Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'EC') {
                    _StdOut.putText("EC Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'D0') {
                    _StdOut.putText("D0 Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'EE') {
                    _StdOut.putText("EE Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'FF') {
                    _StdOut.putText("FF Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == 'EA') {
                    _StdOut.putText("EA Run!");
                    _StdOut.advanceLine();
                }
                else if (_MemoryManager.read(this.currentPCB, this.PC) == '00') {
                    this.isExecuting = false; // stop the damn thing!
                    _StdOut.putText("00 Run!");
                    _StdOut.advanceLine();
                }
                else {
                    //what do I do again?
                    this.PC++; // count as instruction because yah...
                }
            }
            if (this.currentPCB !== null) {
                this.updatePCB(); // update the things!
            }
        };
        return Cpu;
    }());
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
