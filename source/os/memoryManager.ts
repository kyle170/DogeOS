module TSOS {
    export class MemoryManager {
        private memoryTotalSize: number = _Memory.memorySize; 
		
		constructor(){
			// nothing needed...just a palceholder
		}
		
		public init(){
			// nothing needed...just a palceholder
		}
		
		public writeToMemory(ProcessControlBlock: TSOS.PCB, MemoryLocation: number, dataToWrite: string): void {
			// write the data to memory, checking if it is within bounds first
			var violatesBounds: boolean = false;
			if((ProcessControlBlock.BaseReg+MemoryLocation) < ProcessControlBlock.BaseReg || (ProcessControlBlock.BaseReg+MemoryLocation) > ProcessControlBlock.LimReg){ // checks if its within its own bounds!
				violatesBounds = true;
			}
			if(!violatesBounds){
				return _Memory.setByte((ProcessControlBlock.BaseReg+MemoryLocation), dataToWrite); // send command to setByte to write data at location with data within its bounds
			}else{
				_StdOut.putText("Memory Bounds Violation Error! - Tying to write: "+(ProcessControlBlock.BaseReg+MemoryLocation)); // return fatal error if its outside (memory seeking missile program)
				_StdOut.advanceLine();
			}
		} 
		
		public readFromMemory(ProcessControlBlock: TSOS.PCB, MemoryLocation: number): string { 
			// read the data from memory, again, checking if there is a bounds error!
			var violatesBounds: boolean = false;
			if((ProcessControlBlock.BaseReg+MemoryLocation) < ProcessControlBlock.BaseReg || (ProcessControlBlock.BaseReg+MemoryLocation) > ProcessControlBlock.LimReg){ // checks if its within its own bounds!
				violatesBounds = true;
			}
			if(!violatesBounds){
				return _Memory.getByte(ProcessControlBlock.BaseReg+MemoryLocation);
			}else{
				_StdOut.putText("Memory Bounds Violation Error! - Tying to read: "+(ProcessControlBlock.BaseReg+MemoryLocation)); // return fatal error if its outside (memory seeking missile program)
				_StdOut.advanceLine();
			}
		}
		
		public alloicateMemoryForProgram(ProcessControlBlock: TSOS.PCB, ProgramData: Array<string>, prio: number): void {
			// program comes in as a string of doubles... we must write it in the memory!
			//_Memory.clearMem(); // clear anything that was previously in there
			ProcessControlBlock.BaseReg = (ProcessControlBlock.PID*256);	//set base limit
			ProcessControlBlock.LimReg = ProcessControlBlock.BaseReg+255;	// set max limit
			ProcessControlBlock.Priority = prio; // sets priority
			for(var i:number=0; i<(ProcessControlBlock.LimReg-ProcessControlBlock.BaseReg); i++){
				var data: string = ProgramData[i]; 
				if(data !== undefined){ // if its not nothing
					_Memory.setByte(ProcessControlBlock.BaseReg+i, data); 	// set the data
				}else{
					_Memory.setByte(ProcessControlBlock.BaseReg+i, '00');	// set a blank (nothing)
				}
			}
			TSOS.Control.memoryUpdate();
		}
		
		public clearAllMemory(): void {
			for(var i: number=0; i<this.memoryTotalSize; i++){
				_Memory.setByte(i, '00');
			}
			TSOS.Control.memoryUpdate();
		}
		
		public removeProgramsMemory(ProcessControlBlock: TSOS.PCB): void {
			var base = ProcessControlBlock.BaseReg;
			var lim = ProcessControlBlock.LimReg;
			for(var i: number = base; i < lim; i++){
				_Memory.setByte(i, '00');
			}
		}
		
		public PageFault(): void {
			//save the old pcb
			
			
			// get the new pcb ready
			
			
			
		}
		
    }
}