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
		//begin the OP codes here (static cause we DO NOT want them changing)
		static OP_A9: number = 169;
		static OP_AD: number = 173;
		static OP_8D: number = 141;
		static OP_6D: number = 109;
		static OP_A2: number = 162;
		static OP_AE: number = 174;
		static OP_A0: number = 160;
		static OP_AC: number = 172;
		static OP_EA: number = 234;
		static OP_00: number = 0; // duh...what else were you expecting here?
		static OP_EC: number = 236;
		static OP_D0: number = 208;
		static OP_EE: number = 238;
		static OP_FF: number = 255;
	
        constructor(public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

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
		public ExecuteInstruction(operation: Byte): void {
			var operationDecimal: number = operation.GetDecimal(); // from the byte representation to the decimal... its easier to work like this
			switch(operationDecimal){ // switch case here because if/else's would be too many
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
				
				//Note: 10/15/16 @ 8:27PM.... confusion between break; and bark; ... the words are starting to looze their meanings @_@
				
			}
		}
		
		
		//begin the methods that control the OP code calls
		
		private LoadTheAccumulator(): void{
			
			
		}
		
		private LoadAccumulatedRAM(): void{
			
			
		}
		
		private AddCarry(): void{
			
			
		}
		
		private LoadXConstructor(): void{
			
			
		}
		
		private LoadXRAM(): void{
			
			
		}
		
		private LoadYConstructor(): void{
			
			
		}
		
		private LoadYRAM(): void{
			
			
		}
		
		private NoOperation(): void{
			
			
		}
		
		private DoneWithExecution(): void{
			
			
		}
		
		private Compare(): void{
			
			
		}
		
		private Branch(): void{
			
			
		}
		
		private Incriment(): void{
			
			
		}
		
		
		private SystemCall(): void{
			
			
		}
		

		
		
		
    }
}
