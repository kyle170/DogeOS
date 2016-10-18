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
            if(this.currentPCB.processState === ProcessState.Terminated){
                _StdOut.putText('This process has already been terminated or doesnt exist');
            } else {
                this.currentPCB.processState = ProcessState.Running;
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
            this.PC = this.PC % (this.currentPCB.limitRegister - this.currentPCB.baseRegister);
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here. 
            if(this.currentPCB !== null && this.isExecuting){
				if(_MemoryManager.read(this.currentPCB, this.PC) == 'A9'){ // Load acc with constant 
					//Lets get this stareted!
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'AD'){  // Load acc from memory 
					//
				
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == '8D'){ // Store acc in memory 
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == '6D'){ // Add with carry (adds contents from addr to acc and stores in acc)
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'A2'){ // Load X Register with constant 
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'AE'){ // Load X Register from memory 
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'A0'){ // Load Y Register with constant 
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'AC'){ // Load Y Register from memory
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'EC'){ // Compare byte at addr to X register, set z flag if equal
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'D0'){ // Branch N bytes if z flag = 0 (byte = N)
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'EE'){ // EE increment a byte at addr 
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'FF'){ // System call: {{{{TBD}}}}
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == 'EA'){ // No OP
					
				}else if(_MemoryManager.read(this.currentPCB, this.PC) == '00'){ // BREAK PROGRAM (sys call) {{{{Something went terribly right!}}}}
					
				}else{
					//what do I do again?
				}
					
				
			}
			if(this.currentPCB !== null){
                this.updatePCB(); // update the things!
            }
        }
    }
}