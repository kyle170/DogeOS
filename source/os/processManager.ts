module TSOS {
    export class ProcessManager {
		public processesList = new Array();
		private processes;
		
		constructor(){
			// nothing here yet
		}
		
		public init(){
			//creates a blank table to start with
			this.processes = [null];
		}
		
		public load(programData: Array<string>): number {
			//load the program into the memory and return a PID to work with
			if((PCB.CPID*256) >= _Memory.memorySize){
				_StdOut.putText("Not enough memory!");
				return -1;
			}
			var ProcessControlBlock = new PCB();
			this.processes[ProcessControlBlock.PID] = ProcessControlBlock;
			_MemoryManager.alloicateMemoryForProgram(ProcessControlBlock, programData);
			this.processesList[ProcessControlBlock.PID] = ProcessControlBlock.PID;
			return ProcessControlBlock.PID;
		}
		
		public getProcessControlBlock(ProcessID: number){
			//simply just grabs the process control block PID
			return this.processes[ProcessID];
		}
    }
}