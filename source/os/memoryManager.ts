module TSOS {
    export class MemoryManager {
        private memoryTotalSize: number = _Memory.memorySize;
		private 
		
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
				_StdOut.putText("PID: "+ProcessControlBlock.PID+" Terminated");
				_StdOut.advanceLine();
				_ProcessManager.kill(ProcessControlBlock.PID);
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
				_StdOut.putText("PID: "+ProcessControlBlock.PID+" Terminated");
				_StdOut.advanceLine();
				_ProcessManager.kill(ProcessControlBlock.PID);
			}
		}
		
		public alloicateMemoryForProgram(ProcessControlBlock: TSOS.PCB, ProgramData: Array<string>, prio: number): void {
			// program comes in as a string of doubles... we must write it in the memory!
			//_Memory.clearMem(); // clear anything that was previously in there
			if(_Formatted && (PCB.CPID*256) >= _Memory.memorySize){ // disk loaded and lets put it on the disk!
				var str: string = "";
				for (var i = 0; i < ProgramData.length; i++){
					if(ProgramData[i] !== undefined){
						str += ""+ProgramData[i];
					}else{
						str += "00";
					}
                }
				ProcessControlBlock.IsInSwap = true;
				ProcessControlBlock.SwapLocation = "003";
				_FileSystemManager.write("swap2", str, true);
				TSOS.Control.fileSystemUpdate();
			}else{	// put into the boring regular memory
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
			}
			TSOS.Control.memoryUpdate();
			TSOS.Control.readyQueueUpdate();
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
		
		public pageFault(nextPID:number, oldPID: number): void {
		/*	var toLoad = _ProcessManager.ResidentList[nextPID];
			var toStore = _ProcessManager.ResidentList[oldPID];
			//save the old pcb
			if(oldPID !== -1){
				var toStoreData = '';
				for(var i=0; i<256; i++){
					toStoreData += this.readFromMemory(toStore, i);
				}
				toStore.IsInSwap = false;
				toStore.SwapLocation = "001";
				_FileSystemManager.write("swap1", toStoreData, true);
				
				TSOS.Control.fileSystemUpdate();
				
			}
			
			// get the new pcb ready
			//var newProg = _krnFileSystemDriver.consoleISR("read", "swap2", true);
			//console.log(newProg);
			var progArray = [];
			for(var i=0; i< newProg.length; i+=2){
				progArray.push(""+ newProg[i] + newProg[i+1]);
			}
			//_FileSystemManager.recursiveFileDelete(0,0,3);
			toLoad.IsInSwap = false;
			toLoad.SwapLocation = "";
			//this.alloicateMemoryForProgram(newProg, progArray);
			TSOS.Control.fileSystemUpdate();
			*/
		}
		
    }
}