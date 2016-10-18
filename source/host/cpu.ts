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
   
module TSOS {
    export class Cpu {
        constructor(
                public PC: number   = 0,   	// program counter
                public Acc: number   = 0,	// accumulator
                public Xreg: number   = 0,	// x register nuber	
                public Yreg: number   = 0,	// Y register number
                public Zflag:number   = 0,	// ZEE FLAG (mostly usless but whatever)
                public isExecuting: boolean  = false,	// status.... do I have something to do or just sit here?	
                public currentPCB: TSOS.PCB = null	// yes... this contains the PCB.... questions?
                ) {
        }

        public init(): void {
			// nothing here so far...
        }

        private loadFromPCB(): void {
			//things are loaded... made sure they're current
			this.PC = this.currentPCB.programCounter;
            this.Acc = this.currentPCB.acc;
            this.Xreg = this.currentPCB.XRegister;
            this.Yreg = this.currentPCB.YRegister;
            this.Zflag = this.currentPCB.ZFlag;
            
        }

        public runProcess(pid: number):void {
			//set the PCB with the PID of the process
            this.currentPCB = _ProcessManager.getPCB(pid);
            if(this.currentPCB.processState === "TERMINATED"){
                _StdOut.putText('This process has already been terminated or doesnt exist');
            } else {
                this.currentPCB.processState = "RUNNING";
                this.loadFromPCB();
                this.isExecuting = true;
			}
        }

        public loadProgram(pcb: TSOS.PCB): void {
			//load the program and set the parameters for the PCB
            this.currentPCB = pcb;
            this.Acc = pcb.acc;
            this.PC = pcb.programCounter;
            this.Xreg = pcb.XRegister;
            this.Yreg = pcb.YRegister;
            this.Zflag = pcb.ZFlag;
        }

        public updatePCB(): void {
			//UPDATE THE PCB IF ITS NOT EMPYTY
            if(this.currentPCB !== null){
                this.currentPCB.update(this.PC, this.Acc, this.Xreg, this.Yreg, this.Zflag);
            }
        }

        public cycle(): void {
            this.PC = this.PC % (this.currentPCB.limitRegister - this.currentPCB.baseRegister); // makin sure things are good before we begin
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here. 
            if(this.currentPCB !== null && this.isExecuting){
				//I had a thought... why not auto incriment the process counter here instead of have it incriment every time?
				this.PC++; // because its smarter to do it here.... because reasons...
				if(_MemoryManager.read(this.currentPCB, this.PC) == 'A9'){ // Load accumulator with constant 
					var temp: string =  _MemoryManager.read(this.currentPCB, this.PC); // get the current infoz from memory!
					this.Acc = parseInt(temp, 16); //make sure we're good here (http://www.w3schools.com/jsref/jsref_parseint.asp)
					this.PC++; // add a cycle!
					_StdOut.putText("A9 Run! - "+ this.Acc);
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'AD'){  // Load acculuminator from memory  (forgot how to spell)
					var temp: string = _MemoryManager.read(this.currentPCB, this.PC);
					var temp2: number = parseInt(temp, 16);
					this.PC++;
					temp = _MemoryManager.read(this.currentPCB, temp2);
					this.Acc = parseInt(temp, 16);
					this.PC++;
					_StdOut.putText("AD Run! - "+ this.Acc);
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == '8D'){ // Store acculuminator in memory
					var temp: string = _MemoryManager.read(this.currentPCB, this.PC);
					var temp2: number = parseInt(temp, 16);
					this.PC++;
					_MemoryManager.write(this.currentPCB, temp2, this.Acc.toString(16)); // I think?... seems to output the right thing
					this.PC++;
					_StdOut.putText("8D Run!");
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == '6D'){ // Add with carry 
					var temp: string = _MemoryManager.read(this.currentPCB, this.PC);
					var temp2: number =  parseInt(temp, 16);
					this.PC++;
					temp = _MemoryManager.read(this.currentPCB, temp2);
					this.Acc = (this.Acc + parseInt(temp, 16));
					this.PC++;
					_StdOut.putText("6D Run! - " + this.Acc);
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'A2'){ // Load X Register with consr
					var temp: string = _MemoryManager.read(this.currentPCB, this.PC);
					var temp2: number = parseInt(temp, 16);
					this.Xreg = temp2;
					this.PC++;
					_StdOut.putText("A2 Run! - "+ this.Xreg);
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'AE'){ // Load X Register from mem 
					var temp: string = _MemoryManager.read(this.currentPCB, this.PC);
					var temp2: number = parseInt(temp, 16);
					this.PC++;
					temp = _MemoryManager.read(this.currentPCB, temp2);
					temp2 = parseInt(temp, 16);
					this.Xreg = temp2;
					this.PC++;
					_StdOut.putText("AE Run! - "+ this.Xreg);
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'A0'){ // Load Y Register with consr
					var temp: string = _MemoryManager.read(this.currentPCB, this.PC);
					var temp2: number = parseInt(temp, 16);
					this.Yreg = temp2;
					this.PC++;
					_StdOut.putText("A0 Run! - "+ this.Yreg);
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'AC'){ // Load Y Register from mem
					var temp: string = _MemoryManager.read(this.currentPCB, this.PC);
					var temp2: number = parseInt(temp, 16);
					this.PC++;
					temp = _MemoryManager.read(this.currentPCB, temp2);
					temp2 = parseInt(temp, 16);
					this.Yreg = temp2;
					this.PC++;
					_StdOut.putText("AC Run! - "+ this.Yreg);
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'EC'){ // Compare byte at addr to X register, set z flag if equal
					var temp: string = _MemoryManager.read(this.currentPCB, this.PC);
					var temp2: number = parseInt(temp, 16);
					this.PC++;
					temp = _MemoryManager.read(this.currentPCB, temp2);
					temp2 = parseInt(temp, 16);
					if(this.Xreg = temp2){
						this.Zflag = 1;
					}else{
						this.Zflag = 0;
					}
					_StdOut.putText("EC Run! - "+ this.Zflag);
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'D0'){ // Branch N bytes if z flag = 0 (byte = N)
					_StdOut.putText("D0 Run!");
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'EE'){ // EE increment a byte at addr 
					_StdOut.putText("EE Run!");
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'FF'){ // System call: {{{{TBD}}}}
					_StdOut.putText("FF Run!");
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'EA'){ // No OP
					this.PC++;
					_StdOut.putText("EA Run (nothing to do)!");
					_StdOut.advanceLine();
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == '00'){ // BREAK PROGRAM (sys call) {{{{Something went terribly right!}}}}
					this.isExecuting = false; // stop the damn thing!
					_MemoryManager.deallocateMemory(this.currentPCB); 	// free up the space
					this.currentPCB.processState = "TERMINATED";
					this.updatePCB();
					// time to set everything back to normal
					this.PC = 0;
					this.Zflag = 0;
					this.Yreg = 0;
					this.Xreg = 0;
					this.Acc = 0;
					this.currentPCB = null;
					_StdOut.putText("PROGRAM COMPLETE -- 00 Run!");
					_StdOut.advanceLine();
				}else{
					//what do I do again?
					this.PC++; // count as instruction because yah...
				}
					
				
			}
			if(this.currentPCB !== null){
                this.updatePCB(); // update the things!
            }
        }
    }
}