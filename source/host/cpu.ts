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
                public PC: number = 0,   				// program counter
                public Acc: number = 0,					// accumulator
                public XReg: number = 0,				// x register nuber	
                public YReg: number = 0,				// Y register number
                public ZFlag:number = 0,				// ZEE FLAG (mostly usless but whatever)
                public isExecuting: boolean = false,	// status.... do I have something to do or just sit here?	
                public currentPCB: TSOS.PCB = null,		// yes... this contains the PCB.... questions?
				public singleStepMode: boolean = false, // are we single stepping?
				public singleStepAuth: boolean = true   // do we have the authority to step?
                ) {
        }

        public init(): void {
			// nothing here so far...
        }

        private loadFromPCB(): void {
			//things are loaded... made sure they're current
			this.PC = this.currentPCB.PC;
            this.Acc = this.currentPCB.Acc;
            this.XReg = this.currentPCB.XReg;
            this.YReg = this.currentPCB.YReg;
            this.ZFlag = this.currentPCB.ZFlag;
            
        }

        public runProcess(PID: number):void {
			//set the PCB with the PID of the process
            this.currentPCB = _ProcessManager.getProcessControlBlock(PID);
            if(this.currentPCB.PS === "TERMINATED"){ // if its not terminated, run it and laod to PCB
                _StdOut.putText('This process has already been terminated or doesnt exist');
            } else {
                this.currentPCB.PS = "RUNNING";
                this.loadFromPCB();
                this.isExecuting = true;
			}
        }

        public loadProgram(ProcessControlBlock: TSOS.PCB): void {
			//load the program and set the parameters for the PCB
            this.currentPCB = ProcessControlBlock;
            this.Acc = ProcessControlBlock.Acc;
            this.PC = ProcessControlBlock.PC;
            this.XReg = ProcessControlBlock.XReg;
            this.YReg = ProcessControlBlock.YReg;
            this.ZFlag = ProcessControlBlock.ZFlag;
        }
		
		public updatePCB(){
			if(this.currentPCB !== null){
                this.currentPCB.update_PCB(this.PC, this.Acc, this.XReg, this.YReg, this.ZFlag);
            }
		}

        public cycle(): void {
			if(this.singleStepAuth){ // does the cpu have the authority to step?
				this.PC = this.PC % 256; // loop back if goes out of bounds
				TSOS.Control.cpuUpdate();
				TSOS.Control.memoryUpdate();
				_Kernel.krnTrace('CPU cycle');
				// TODO: Accumulate CPU usage and profiling statistics here. 
				if(this.currentPCB !== null && this.isExecuting){
					//I had a thought... why not auto incriment the process counter here instead of have it incriment every time?
					//_StdOut.putText("-- RUN: "+_MemoryManager.readFromMemory(this.currentPCB, this.PC)+ ", MEM: "+ _MemoryManager.readFromMemory(this.currentPCB, this.PC+1)+" --"); 
					//_StdOut.advanceLine();
					if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'A9'){ // Load accumulator with constant
						this.PC++;
						var temp: string =  _MemoryManager.readFromMemory(this.currentPCB, this.PC); // get the current infoz from memory!
						this.Acc = parseInt(temp, 16); //make sure we're good here (http://www.w3schools.com/jsref/jsref_parseint.asp)
						this.PC++; // add a cycle!
						console.log("A9 Run! - "+ this.Acc);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'AD'){  // Load acculuminator from memory  (forgot how to spell)
						this.PC++;
						var temp: string = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
						var temp2: number = parseInt(temp, 16);
						this.PC++;
						temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
						this.Acc = parseInt(temp, 16);
						this.PC++;
						console.log("AD Run! - "+ this.Acc);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == '8D'){ // Store acculuminator in memory
						this.PC++;
						var temp: string = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
						var temp2: number = parseInt(temp, 16);
						this.PC++;
						_MemoryManager.writeToMemory(this.currentPCB, temp2, this.Acc.toString(16)); // I think?... seems to output the right thing
						this.PC++;
						console.log("8D Run!");
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == '6D'){ // Add with carry
						this.PC++;
						var temp: string = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
						var temp2: number =  parseInt(temp, 16);
						this.PC++;
						temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
						this.Acc = (this.Acc + parseInt(temp, 16));
						this.PC++;
						console.log("6D Run! - " + this.Acc);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'A2'){ // Load X Register with consr
						this.PC++;
						var temp: string = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
						var temp2: number = parseInt(temp, 16);
						this.XReg = temp2;
						this.PC++;
						console.log("A2 Run! - "+ this.XReg);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'AE'){ // Load X Register from mem 
						this.PC++;
						var temp: string = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
						var temp2: number = parseInt(temp, 16);
						this.PC++;
						temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
						temp2 = parseInt(temp, 16);
						this.XReg = temp2;
						this.PC++;
						console.log("AE Run! - "+ this.XReg);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'A0'){ // Load Y Register with consr
						this.PC++;
						var temp: string = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
						var temp2: number = parseInt(temp, 16);
						this.YReg = temp2;
						this.PC++;
						console.log("A0 Run! - "+ this.YReg);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'AC'){ // Load Y Register from mem
						this.PC++;
						var temp: string = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
						var temp2: number = parseInt(temp, 16);
						this.PC++;
						temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
						temp2 = parseInt(temp, 16);
						this.YReg = temp2;
						this.PC++;
						console.log("AC Run! - "+ this.YReg);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'EC'){ // Compare byte at addr to X register, set z flag if equal
						this.PC++;
						var temp: string = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
						var temp2: number = parseInt(temp, 16);
						this.PC++;
						temp = _MemoryManager.readFromMemory(this.currentPCB, temp2);
						temp2 = parseInt(temp, 16);
						if(this.XReg !== temp2){
							this.ZFlag = 0;
						}else{
							this.ZFlag = 1;
						}
						this.PC++;
						console.log("EC Run! - "+ this.ZFlag);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'D0'){ // Branch N bytes if z flag = 0 (byte = N)
						this.PC++;
						if(this.ZFlag === 0){
							var temp =  _MemoryManager.readFromMemory(this.currentPCB, this.PC);
							this.PC++; // one byte jump
							var temp2: number = parseInt(temp, 16);
							this.PC = this.PC + temp2;
						} else {
							this.PC++;
						}
						console.log("D0 Run! - ZFlag:"+ this.ZFlag + " - OP MOVE POS: "+ this.PC);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'EE'){ // EE increment a byte at addr
						this.PC++;
						var temp: string = _MemoryManager.readFromMemory(this.currentPCB, this.PC);
						var temp2: number = parseInt(temp, 16);
						this.PC++;
						temp = _MemoryManager.readFromMemory(this.currentPCB, this.PC); 
						var temp3: number = parseInt(temp, 16);
						temp3++;
						_MemoryManager.writeToMemory(this.currentPCB, temp2, temp3.toString(16));
						console.log("EE Run! - "+temp2+" -> "+temp3);
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'FF'){ // System call: {{{{TBD}}}}
						// soo.... accroding to this reasarch... if the X is true, I need to return the byte in the y register to the console???
						// and if there is a 2? in the x register?... not there yet
						var tempString: string = "";
						if(this.XReg === 1){
							// #$01 in X reg = print the integer stored in the Y register.
							_StdOut.putText(this.YReg.toString());
							_StdOut.advanceLine();
						} else {
							//  #$02 in X reg = print the 00-terminated string stored at the address in the Y register.
							var tempaddr = this.YReg;
							var temp = _MemoryManager.readFromMemory(this.currentPCB, tempaddr); 
							while(temp !== '00'){
								var character = String.fromCharCode(parseInt(temp, 16));
								tempString += character;
								tempaddr++;
								var temp = _MemoryManager.readFromMemory(this.currentPCB, tempaddr);
								// is there something im forgetting?
							}
							_StdOut.putText(tempString);
							_StdOut.advanceLine();
						}
						this.PC++;
						console.log("FF Run!");
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == 'EA'){ // No OP
						this.PC++;
						console.log("EA Run (nothing to do)!");
					}else if(_MemoryManager.readFromMemory(this.currentPCB, this.PC) == '00'){ // BREAK PROGRAM (sys call) {{{{Something went terribly right!}}}}
						console.log("00 Run!");
						TSOS.Control.cpuUpdate();
						this.isExecuting = false; // stop the damn thing!
						this.currentPCB.PS = "TERMINATED";
						_ProcessManager.processesList[this.currentPCB.PID] = -1;
						this.updatePCB();
						// time to set everything back to normal
						this.PC = 0;
						this.ZFlag = 0;
						this.YReg = 0;
						this.XReg = 0;
						this.Acc = 0;
						this.currentPCB = null;
						_StdOut.putText(">");
						//_StdOut.advanceLine();
					}else{
						//what do I do again?
						_StdOut.putText("UNKNOWN INSTRUCTION: "+_MemoryManager.readFromMemory(this.currentPCB, this.PC));
						_StdOut.advanceLine();
						this.PC++; // count as instruction because yah...
					}
				}
				if(this.currentPCB !== null){
					this.updatePCB();
				}
				if(this.singleStepMode){
					this.singleStepAuth = false;
				}
			}
        }
    }
}