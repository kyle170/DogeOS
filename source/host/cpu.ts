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

        constructor(public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false,
					//begin the OP codes here (static cause we DO NOT want them changing)
					public OP_A9: number = 169,
					public OP_AD: number = 173,
					public OP_8D: number = 141,
					public OP_6D: number = 109,
					public OP_A2: number = 162,
					public OP_AE: number = 174,
					public OP_A0: number = 160,
					public OP_AC: number = 172,
					public OP_EA: number = 234,
					public OP_00: number = 0, // duh...what else were you expecting here?
					public OP_EC: number = 236,
					public OP_D0: number = 208,
					public OP_EE: number = 238,
					public OP_FF: number = 255) {

        }

        public init(): void {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        }

        public cycle(): void {
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
			
			
			// I fear what I have to do here @_@
        }
		
		// this is how the 6502 will know what to do on each op code
		public ExecuteInstruction(operation: number): void {
			switch(operation){ // switch case here because if/else's would be too many
				case this.OP_A9:
					//this.; 
					break;
				case this.OP_AD;
					//this.; 
					break;
				case this.OP_8D;
					//this.(); 
					break;
				case this.OP_6D;
					//this.(); 
					break;
				case this.OP_A2;
					//this.(); 
					break;
				case this.OP_AE;
					//this.(); 
					break;
				case this.OP_A0;
					//this.(); 
					break;
				case this.OP_AC;
					//this.(); 
					break;
				case this.OP_EA;
					//this.(); 
					break;
				case this.OP_00;
					//this.(); 
					break;
				case this.OP_EC;
					//this.(); 
					break;
				case this.OP_D0;
					//this.(); 
					break;
				case this.OP_EE;
					//this.(); 
					break;
				case this.OP_FF;
					//this.(); 
					break;
				default:
					//what do here?... halp!
					//something.jpg
					break;
				
				//Note: 10/15/16 @ 8:27PM.... confusion between break; and bark; ... the words are starting to looze their meanings @_@
				
			}
			
			
			
			
			
		}
    }
}
