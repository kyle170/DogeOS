module TSOS {
    export class ProcessManager {
		public processesList = new Array();
		public ResidentList: TSOS.PCB[];
		public readyQueue: TSOS.Queue;
		private processes;
		
		constructor(private maxPIDs: number){
			this.readyQueue = new Queue(); // bringith the queue :)	
			this.ResidentList = []; // initialize the resident list array
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
		
		public runall(){
			// nothing here yet
		}
		
		public kill(pid: number){
			// nothing here yet
		}
		
		public getRunning(){
			// nothing here yet
		}
		
		public checkIfExists(pid: number){
			// nothing here yet
		}
		
		public getProcessControlBlock(ProcessID: number){
			//simply just grabs the process control block PID
			return this.processes[ProcessID];
		}
    }
}