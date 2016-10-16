/* 
The butler of memories!
We got 768k to work with!
 */   

module TSOS {
    export class ManagerOfMemory {
        public static LoadProgram(program: Array<string>): number {
			//we're going to load the program in here!
			//return the pid if loaded
			var ramBlock: RAM = new RAM();
			var ramBlockLocation: number = 1;
			var ramAddress: number = 0; // cause we start at 0 baby!
			
			//clear the memory incase something was in there  --- On second thought lets wait to see how this plays out before I go crazy... EDIT: TOO LATE

			for (var i=0; i<program.length; i++){ // time to loop through the program and assign it within our RAM!
				ramBlock.Set(i, program[i]);
			}
			
			// invoke the PCB and do stuff (mainly we want a PID from this)
			var pcb = new ProcessControlBlock();
			pcb.RAMLimit = ramBlockLocation  * 255 + 255; // max is the block its in, multiplied by the size it can be, with a 255 byte overhead
			pcb.RAMBase = ramBlockLocation * 256; // yayayay
			

			return pcb.PID;
			
			//
		}
    }
} 