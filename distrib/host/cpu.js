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
            XReg, // x register nuber	
            YReg, // Y register number
            ZFlag, // ZEE FLAG (mostly usless but whatever)
            isExecuting, // status.... do I have something to do or just sit here?	
            currentPCB, // yes... this contains the PCB.... questions?
            singleStepMode, // are we single stepping?
            singleStepAuth, // do we have the authority to step?
            pid) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (XReg === void 0) { XReg = 0; }
            if (YReg === void 0) { YReg = 0; }
            if (ZFlag === void 0) { ZFlag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            if (currentPCB === void 0) { currentPCB = null; }
            if (singleStepMode === void 0) { singleStepMode = false; }
            if (singleStepAuth === void 0) { singleStepAuth = true; }
            if (pid === void 0) { pid = 0; }
            this.PC = PC;
            this.Acc = Acc;
            this.XReg = XReg;
            this.YReg = YReg;
            this.ZFlag = ZFlag;
            this.isExecuting = isExecuting;
            this.currentPCB = currentPCB;
            this.singleStepMode = singleStepMode;
            this.singleStepAuth = singleStepAuth;
            this.pid = pid;
        }
        Cpu.prototype.init = function () {
            // nothing here so far...
        };
        Cpu.prototype.loadFromPCB = function () {
            //things are loaded... made sure they're current
            this.PC = this.currentPCB.PC;
            this.Acc = this.currentPCB.Acc;
            this.XReg = this.currentPCB.XReg;
            this.YReg = this.currentPCB.YReg;
            this.ZFlag = this.currentPCB.ZFlag;
        };
        Cpu.prototype.loadProgram = function (ProcessControlBlock) {
            //load the program and set the parameters for the PCB
            this.currentPCB = ProcessControlBlock;
            this.currentPCB.PS = "RUNNING";
            this.pid = this.currentPCB.PID;
            this.loadFromPCB();
        };
        Cpu.prototype.updatePCB = function () {
            if (this.currentPCB !== null) {
                this.currentPCB.update_PCB(this.PC, this.Acc, this.XReg, this.YReg, this.ZFlag);
            }
        };
        Cpu.prototype.cycle = function () {
            if (this.singleStepAuth) {
                this.PC = this.PC % 256; // loop back if goes out of bounds
                TSOS.Control.cpuUpdate();
                TSOS.Control.memoryUpdate();
                _Kernel.krnTrace('CPU cycle');
                // TODO: Accumulate CPU usage and profiling statistics here. 
                if (this.currentPCB !== null && this.isExecuting) {
                    //I had a thought... why not auto incriment the process counter here instead of have it incriment every time?
                    //_StdOut.putText("-- RUN: "+_MemoryManager.readFromMemory(this.currentPCB, this.PC)+ ", MEM: "+ _MemoryManager.readFromMemory(this.currentPCB, this.PC+1)+" --"); 
                    //_StdOut.advanceLine();
                    _CPUScheduler.pCounter++;
                    if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'A9') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC); // get the current infoz from memory!
                        this.Acc = parseInt(temp, 16); //make sure we're good here (http://www.w3schools.com/jsref/jsref_parseint.asp)
                        this.PC++; // add a cycle!
                        console.log("A9 Run! - " + this.Acc);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'AD') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp2 = parseInt(temp, 16);
                        this.PC++;
                        temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
                        this.Acc = parseInt(temp, 16);
                        this.PC++;
                        console.log("AD Run! - " + this.Acc);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == '8D') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp2 = parseInt(temp, 16);
                        this.PC++;
                        _MemoryManager.writeToMemory(this.currentPCB, temp2, this.Acc.toString(16)); // I think?... seems to output the right thing
                        this.PC++;
                        console.log("8D Run!");
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == '6D') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp2 = parseInt(temp, 16);
                        this.PC++;
                        temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
                        this.Acc = (this.Acc + parseInt(temp, 16));
                        this.PC++;
                        console.log("6D Run! - " + this.Acc);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'A2') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp2 = parseInt(temp, 16);
                        this.XReg = temp2;
                        this.PC++;
                        console.log("A2 Run! - " + this.XReg);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'AE') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp2 = parseInt(temp, 16);
                        this.PC++;
                        temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
                        temp2 = parseInt(temp, 16);
                        this.XReg = temp2;
                        this.PC++;
                        console.log("AE Run! - " + this.XReg);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'A0') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp2 = parseInt(temp, 16);
                        this.YReg = temp2;
                        this.PC++;
                        console.log("A0 Run! - " + this.YReg);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'AC') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp2 = parseInt(temp, 16);
                        this.PC++;
                        temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
                        temp2 = parseInt(temp, 16);
                        this.YReg = temp2;
                        this.PC++;
                        console.log("AC Run! - " + this.YReg);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'EC') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp2 = parseInt(temp, 16);
                        this.PC++;
                        temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
                        temp2 = parseInt(temp, 16);
                        if (this.XReg !== temp2) {
                            this.ZFlag = 0;
                        }
                        else {
                            this.ZFlag = 1;
                        }
                        this.PC++;
                        console.log("EC Run! - " + this.ZFlag);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'D0') {
                        this.PC++;
                        if (this.ZFlag === 0) {
                            var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                            this.PC++; // one byte jump
                            var temp2 = parseInt(temp, 16);
                            this.PC = this.PC + temp2;
                        }
                        else {
                            this.PC++;
                        }
                        console.log("D0 Run! - ZFlag:" + this.ZFlag + " - OP MOVE POS: " + this.PC);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'EE') {
                        this.PC++;
                        var temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp2 = parseInt(temp, 16);
                        this.PC++;
                        temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
                        var temp3 = parseInt(temp, 16);
                        temp3++;
                        _MemoryManager.writeToMemory(this.currentPCB, temp2, temp3.toString(16));
                        console.log("EE Run! - " + temp2 + " -> " + temp3);
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'FF') {
                        // soo.... accroding to this reasarch... if the X is true, I need to return the byte in the y register to the console???
                        // and if there is a 2? in the x register?... not there yet
                        var tempString = "";
                        if (this.XReg === 1) {
                            // #$01 in X reg = print the integer stored in the Y register.
                            _StdOut.putText(this.YReg.toString());
                            _StdOut.advanceLine();
                        }
                        else {
                            //  #$02 in X reg = print the 00-terminated string stored at the address in the Y register.
                            var tempaddr = this.YReg;
                            var temp = _MemoryManager.readFromMemory(this.currentPCB, tempaddr);
                            while (temp !== '00') {
                                var character = String.fromCharCode(parseInt(temp, 16));
                                tempString += character;
                                tempaddr++;
                                var temp = _MemoryManager.readFromMemory(this.currentPCB, tempaddr);
                            }
                            _StdOut.putText(tempString);
                            _StdOut.advanceLine();
                        }
                        this.PC++;
                        console.log("FF Run!");
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'EA') {
                        this.PC++;
                        console.log("EA Run (nothing to do)!");
                    }
                    else if (_MemoryManager.readFromMemory(this.currentPCB, this.PC) == '00') {
                        console.log("00 Run!");
                        this.updatePCB();
                        this.currentPCB.PS = "TERMINATED";
                        TSOS.Control.cpuUpdate();
                        _CPUScheduler.clearPCB();
                        // time to set everything back to normal
                        this.PC = 0;
                        this.ZFlag = 0;
                        this.YReg = 0;
                        this.XReg = 0;
                        this.Acc = 0;
                        this.currentPCB = null;
                        _StdOut.putText(">");
                        //_StdOut.advanceLine();
                        if (_ProcessManager.readyQueue.getSize() === 0) {
                            this.isExecuting = false;
                        }
                    }
                    else {
                        //what do I do again?
                        _StdOut.putText("UNKNOWN INSTRUCTION: " + _MemoryManager.readFromMemory(this.currentPCB, this.PC));
                        _StdOut.advanceLine();
                        this.PC++; // count as instruction because yah...
                    }
                }
                if (this.currentPCB !== null) {
                    this.updatePCB();
                }
                if (this.singleStepMode) {
                    this.singleStepAuth = false;
                }
            }
        };
        return Cpu;
    }());
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
