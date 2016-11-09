module TSOS {
    export class CPUScheduler {
		public schedulingType: string; // ROUND_ROBIN, FCFS
		private quantum: number;
		private CurrentPCBProgram: TSOS.PCB;
		
		
		constructor(){
			// presets on boot
			this.quantum = 4;
			this.schedulingType = "Quantium";
		}
		
		public init(){
			// nothing here yet
		}
		
		public schedule() {
			if(_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() > 0){
                var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING";
				this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
                _CPU.isExecuting = true;
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