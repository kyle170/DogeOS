module TSOS {
    export class ProcessManager {
		public processesList = new Array();
		public ResidentList: TSOS.PCB[];
		public readyQueue: TSOS.Queue;
		private PCBCONVERTER: TSOS.PCB;
		private processes;
		
		constructor(private maxPIDs: number){
			this.readyQueue = new Queue(); // bringith the queue :)	
			this.ResidentList = []; // initialize the resident list array
		}
		
		public init(){
			//creates a blank table to start with
			this.processes = [null];
		}
		
		public load(programData: Array<string>, prio: number): number {
			//load the program into the memory and return a PID to work with
			if((PCB.CPID*256) >= _Memory.memorySize){
				_StdOut.putText("Not enough memory!");
				return -1;
			}
			var ProcessControlBlock = new PCB();
			this.ResidentList[ProcessControlBlock.PID] = ProcessControlBlock;
			_MemoryManager.alloicateMemoryForProgram(ProcessControlBlock, programData, prio);
			this.processesList[ProcessControlBlock.PID] = ProcessControlBlock.PID;
			return ProcessControlBlock.PID;
		}
		
		public runPiD(ProcessID: number): void {
			var ProcessControlBlock = this.ResidentList[ProcessID];
			ProcessControlBlock.PS = "WAITING";
			this.PCBCONVERTER = this.ResidentList[ProcessID];
			this.readyQueue.enqueue(this.PCBCONVERTER); // send her off
		}
		
		public runall(): boolean{
			// nothing here yet
			var counter:number = 0;
			for(var i:number=0; i<this.ResidentList.length; i++){
				if(this.ResidentList[i].PS === "NEW"){
					_StdOut.putText("Attempting to run PID: "+ i);
					_StdOut.advanceLine();
					counter++;
					this.runPiD(i);
				}
			}
			if(counter != 0){
				return true;
			}else{
				return false;
			}
		}
		
		public kill(ProcessID: number){
			// nothing here yet
			// TODO: Stop execution, (KEEP IS_EXECUTING RUNNING), deallicate memory
			var ProcessControlBlock = this.ResidentList[ProcessID];
			_MemoryManager.removeProgramsMemory(ProcessControlBlock);
			ProcessControlBlock.PS = "TERMINATED";
			if(this.readyQueue.getSize() === 0 && _CPU.currentPCB === null){
                _CPU.isExecuting = false;
            }
		}
		
		public getRunning(): String {
			var output: string = "";
			for(var i: number = 0; i<this.ResidentList.length; i++){
				if(this.ResidentList[i].PS == 'RUNNING' || this.ResidentList[i].PS == 'WAITING'){
					output = output + i + ", ";
				}
			}
			return output.substring(0, output.length-2);
		}
		
		public checkIfExists(ProcessID: number): boolean{
			if(this.ResidentList[ProcessID] !== null && this.ResidentList[ProcessID] !== undefined){
				return true;
			}else{
				return false;
			}
		}
		
		public getProcessControlBlock(ProcessID: number){
			//simply just grabs the process control block PID
			return this.ResidentList[ProcessID];
		}
    }
}