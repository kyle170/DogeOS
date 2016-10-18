module TSOS {
    export class ProcessManager {
		
		private processes;
		
		constructor(){
			// nothing here yet
		}
		
		public init(){
			//creates a blank table to start with
			this.processes = [null];
		}
		
		public load(programData: Array<String>): number {
			//load the program into the memory and return a PID to work with
			var ProcessControlBlock = new PCB();
			this.processes[pcb.PID] = ProcessControlBlock;
			_MemoryManager.alloicateMemoryForProgram(ProcessControlBlock, programData);
			return ProcessControlBlock.PID;
		}
		
		public getProcessControlBlock(ProcessID: number){
			//simply just grabs the process control block PID
			return this.processes[ProcessID];
		}
    }
}