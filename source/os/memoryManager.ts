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
			if(MemoryLocation < ProcessControlBlock.BaseReg || MemoryLocation > ProcessControlBlock.LimReg){ // checks if its within its own bounds!
				violatesBounds = true;
			}
			if(!violatesBounds){
				return _Memory.setByte((ProcessControlBlock.BaseReg+MemoryLocation), dataToWrite); // send command to setByte to write data at location with data within its bounds
			}else{
				_StdOut.putText("Memory Bounds Violation Error!"); // return fatal error if its outside (memory seeking missile program)
			}
		}
		
		public readFromMemory(ProcessControlBlock: TSOS.PCB, MemoryLocation: number): string { 
			// read the data from memory, again, checking if there is a bounds error!
			var violatesBounds: boolean = false;
			if(MemoryLocation < ProcessControlBlock.BaseReg || MemoryLocation > ProcessControlBlock.LimReg){ // checks if its within its own bounds!
				violatesBounds = true;
			}
			if(!violatesBounds){
				return _Memory.getByte(ProcessControlBlock.BaseReg+MemoryLocation);
			}else{
				_StdOut.putText("Memory Bounds Violation Error!"); // return fatal error if its outside (memory seeking missile program)
			}
			
		}
		
		public alloicateMemoryForProgram(ProcessControlBlock: TSOS.PCB, ProgramData: Array<string>): void {
			// program comes in as a string of doubles... we must write it in the memory!
			_Memory.clearMem(); // clear anything that was previously in there
			ProcessControlBlock.BaseReg = 0;	//set base limit
			ProcessControlBlock.LimReg = ProcessControlBlock.BaseReg+255;	// set max limit
			for(var i:number=0; i<=(ProcessControlBlock.LimReg-ProcessControlBlock.BaseReg); i++){
				var data: string = ProgramData[i]; 
				if(data !== undefined){ // if its not nothing
					_Memory.setByte(ProcessControlBlock.BaseReg+i, data); 	// set the data
				}else{
					_Memory.setByte(ProcessControlBlock.BaseReg+i, '00');	// set a blank (nothing)
				}
			}	
		}
		
    }
}