module TSOS {
    export class CPUScheduler {
		public schedulingType: string; // ROUND_ROBIN, FCFS
		private quantum: number;
		public pCounter: number;
		private CurrentPCBProgram: TSOS.PCB;
		
		
		constructor(){
			// presets on boot
			this.quantum = 6; // default quantum
			this.pCounter = 1; // set default counter
			this.schedulingType = "ROUND_ROBIN";
		}
		
		public init(){
			// nothing here yet
		}
		
		public clearPCB(): void {
			this.CurrentPCBProgram = null;
			this.pCounter = 0;
		}
		
		public schedule(): void {
			// nothing here yet
			if(this.schedulingType === "ROUND_ROBIN"){
				// do round robbin
				this.ScheduleRoundRobbin();
			}else{
				//WTFIDKBBQ
				this.ScheduleRoundRobbin();
			}
		}
		
		public contextSwitch(): void {
			if(_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() > 0){ // nothing to start with and a program arrives
                var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING"; 
				this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
            }else if(_CPU.currentPCB !== null && _ProcessManager.readyQueue.getSize() > 0){ // something already is in tehre and another program arrives
				_CPU.updatePCB();
				var ProgramToRun = _ProcessManager.readyQueue.dequeue();
				ProgramToRun.PS = "RUNNING";
				// TAKE CURRENTLY RUNNING OFF AND PUSH BACK TO READY!
				this.CurrentPCBProgram.PS = "WAITING";
				_ProcessManager.readyQueue.enqueue(this.CurrentPCBProgram);
				this.CurrentPCBProgram = ProgramToRun;
				_CPU.loadProgram(this.CurrentPCBProgram);
			}
		}
		
		private ScheduleRoundRobbin(): void {
			if(_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() > 0){
                var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING";
				this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
				_CPU.isExecuting = true;
            }else if(_CPU.currentPCB !== null && _ProcessManager.readyQueue.getSize() > 0){
				if(this.pCounter >= this.quantum){
					this.pCounter = 1;
					this.contextSwitch();
				}
			}else{
				//nothing?>
			}
		}
		
		public QuantumGet(): number {
			return this.quantum;
		}
		
		public QuantiumSet(Quantum: number){
			this.quantum = Quantum;
		}
		
		public schedulingModeSet(mode: string){
			this.schedulingType = mode;
		}
	}
}