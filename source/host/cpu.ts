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
                public PC:          number   = 0,
                public Acc:         number   = 0,
                public Xreg:        number   = 0,
                public Yreg:        number   = 0,
                public Zflag:       number   = 0,
                public isExecuting: boolean  = false,
                public currentPCB:  TSOS.PCB = null
                ) {
        }

        public init(): void {
			// nothing here so far...
        }

        private loadFromPCB(): void {
			//things are loaded
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
                _StdOut.putText('This process has already been terminated');
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
                TSOS.Control.updateProcessDisplay(this.currentPCB);
                this.currentPCB.update(this.PC, this.Acc, this.Xreg, this.Yreg, this.Zflag);
            }
        }

        public cycle(): void {
            this.PC = this.PC % (this.currentPCB.limitRegister - this.currentPCB.baseRegister);
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here. 
            if(this.currentPCB !== null && this.isExecuting){
				switch(_MemoryManager.read(this.currentPCB, this.PC)){
					case 'A9': // Load acc with constant 
						break;
					case 'AD': break;// Load acc from memory 
					case '8D': break;// Store acc in memory 
					case '6D': break;// Add with carry (adds contents from addr to acc and stores in acc)
					case 'A2': break;// Load X Register with constant 
					case 'AE': break;// Load X Register from memory 
					case 'A0': break;// Load Y Register with constant 
					case 'AC': break;// Load Y Register from memory
					case 'EC': break;// Compare byte at addr to X register, set z flag if equal
					case 'D0': break;// Branch N bytes if z flag = 0 (byte = N)
					case 'EE': break;// EE increment a byte at addr 
					case 'FF': break;// System call:
					case 'EA': break;// No OP
					case '00': break;// BREAK PROGRAM (sys call)
					default: break;
				}
			}
			if(this.currentPCB !== null){
                this.updatePCB();
            }
        } // End of cycle
    }
}