///<reference path="../globals.ts" />
module TSOS {
    export class CPUScheduler {
		public schedulingType: string; // ROUND_ROBIN, FCFS, priority
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
			if(this.schedulingType === "ROUND_ROBIN" || this.schedulingType === "FCFS"){
				// do round robbin
				this.ScheduleRoundRobbin();
			}else{
				//WTFIDKBBQ
				this.SchedulePrio();
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
					 _Kernel.krnInterruptHandler("CONTEXT_SWITCH");
				}
			}else{
				//nothing?>
			}
		}
		
		private SchedulePrio(): void {

			if(_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() === 1){
				//empty CPU and only one other program... switch to that when done!
				var ProgramToRun = _ProcessManager.readyQueue.dequeue();
                ProgramToRun.PS = "RUNNING";
				this.CurrentPCBProgram = ProgramToRun;
                _CPU.loadProgram(this.CurrentPCBProgram);
				_CPU.isExecuting = true;
				return;
			}
			if(_CPU.currentPCB === null){ // theres nothing on the CPU
				// nothing is running
				var arrayThatHoldsThePrograms = [];
				var sizeOfReadyQueue = _ProcessManager.readyQueue.getSize();
				for(var i = 0; i < sizeOfReadyQueue; i++){
					arrayThatHoldsThePrograms.push(_ProcessManager.readyQueue.dequeue());
				}
				// now that we have all the programs OFF The PCB, lets reorganize and readd
				for (var i=0; i < arrayThatHoldsThePrograms.length; i++){
					var bestpriofound: number = 999999999999; 
					for(var j=0; j < arrayThatHoldsThePrograms.length; j++){
						var currentPCB = arrayThatHoldsThePrograms[j];
						if(currentPCB === undefined || currentPCB === null){ continue; }
						if(currentPCB.Priority < bestpriofound){
							bestpriofound = currentPCB.Priority;
							//JSON.stringify(currentPCB.Priority);
						}
					}
					console.log( bestpriofound );
					//found the lowest priority
					for(var j=0; j < arrayThatHoldsThePrograms.length; j++){
						var currentPCB = arrayThatHoldsThePrograms[j];
						if(currentPCB === undefined || currentPCB === null){ continue; }
						if(currentPCB.Priority === bestpriofound){
							_ProcessManager.readyQueue.enqueue(currentPCB);
							delete arrayThatHoldsThePrograms[j];
							//console.log(bestpriofound);
							break; // thats it...we're done here!
						}
					}
				}
			}
			// If current program is done, do next one
            if (_CPU.currentPCB === null && _ProcessManager.readyQueue.getSize() > 0){
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