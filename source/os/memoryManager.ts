module TSOS {
    export class MemoryManager {
        private memorySize;
        private allocated;
        private numOfBlocks;
        constructor(maxProcesses: number){
            this.memorySize = _Memory.getSize();				
            this.numOfBlocks = this.memorySize/maxProcesses;	
            this.allocated = new Array(maxProcesses);			// we eventually want to set the max amount of processes we can run... right?
            for(var i = 0; i < this.allocated.length; i++){ 	// make sure we mark as available space!
                this.allocated[i] = -1;
            }
        }

        public init(): void {
			// nothing here yet!
        }

        public read(pcb: TSOS.PCB, memloc: number): string {
			var byteMem = "";										// resetr the byteMem just to be safe
            if(memloc >= 0 && memloc < 256){						// make sure we're within bounds!
                byteMem = _Memory.getByte(pcb.baseRegister + memloc);		//get the byte from memory at the location of base + location (BLOCK OFFSET)
            } else {
                _StdOut.putText("Memory Access Error!");			// ruuu roo... your out of bounds of the memory!
            }
			 return byteMem;
        }

        public write(pcb: TSOS.PCB, memloc: number, data: string): void {
            if(memloc >= 0 && memloc < 256){							// make sure we're within bounds!
                return _Memory.setByte(pcb.baseRegister + memloc, data); // write the byte to the baseRegister( start + location of the memory)
            } else {
                _StdOut.putText("Memory Access Error!");					// ruuu roo... your out of bounds of the memory!
            }
        }

        public allocateMemory(pcb: TSOS.PCB, program: Array<string>): void {
            for(var i = 0; i < this.allocated.length; i++){					// alloicate the memyr!
                if(this.allocated[i] === -1){								// make sure its not in ues first
                    this.allocated[i] = pcb.processID;						// assign that it is allocated
                    pcb.baseRegister = (i * 256);							// let the pcb know the start or block of its program memory
                    pcb.limitRegister = (pcb.baseRegister + 255);			// its max is 255 (not 256 cause.. reasons ) above its base!
                    break;													// hop out of we're all good here
                }
            }
            if(pcb.baseRegister === -1){									
                _StdOut.putText("No more space for programs");	
            }
            for(var i = 0; i < 256; i++){
                var code = program[i];
				if(code !== undefined){
					_Memory.setByte(pcb.baseRegister + i, code);			// if we actually have something to put ion the memory, do it
				}else{
					_Memory.setByte(pcb.baseRegister + i, '00');			// otherwize fill it with nothingness!
				}
            }
        }

        public deallocateMemory(pcb: TSOS.PCB): void {
            // going to wait on this to do it!
        }
    }
}