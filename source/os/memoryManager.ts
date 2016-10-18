module TSOS {
    export class MemoryManager {
        private memoryTotalSize: number = _Memory.MemorySize;
		
		constructor(){
			
		}
		
		public init(){
			
		}
		
		
		public writeToMemory(ProcessControlBlock: TSOS.PCB, MemoryLocation: number, dataToWrite: string): void {
			// write the data to memory, checking if it is within bounds first
			var violatesBounds: boolean = false;
			if(MemoryLocation < ProcessControlBlock.BaseReg || MemoryLocation > ProcessControlBlock.LimReg){ // checks if its within its own bounds!
				violatesBounds = true;
			}
			if(!violatesBounds){
				return _Memory.setByte((ProcessControlBlock.BaseReg+MemoryLocation), dataToWrite); // send command to setByte to write data at location with data within its bounds
			}else{
				_StdOut.putText("Memory Bounds Violation Error!"); // return fatal error if its outside (memory seeking missile program)
			}
		}
		
		public readFromMemory(ProcessControlBlock: TSOS.pcb, MemoryLocation: number): void {
			// read the data from memory, again, checking if there is a bounds error!
			var violatesBounds: boolean = false;
			if(MemoryLocation < ProcessControlBlock.BaseReg || MemoryLocation > ProcessControlBlock.LimReg){ // checks if its within its own bounds!
				violatesBounds = true;
			}
			if(!violatesBounds){
				return _Memory.getByte(ProcessControlBlock+MemoryLocation);
			}else{
				_StdOut.putText("Memory Bounds Violation Error!"); // return fatal error if its outside (memory seeking missile program)
			}
			
		}
		
		public alloicateMemoryForPCB(ProcessControlBlock: TSOS.PCB, ProgramData: Array<String>): void {
			// program comes in as a string of doubles... we must write it in the memory!
			
		}
		
    }
}