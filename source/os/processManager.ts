module TSOS {
    export class ProcessManager {
		private processes;
        constructor(private maxProcesses: number){
        }
		
		//Initalize the Process Manager class
        public init(): void {
            this.processes = [null];
        }
		
		//This loads the PCB (Process Control Block, adn sees if the max defined value is exceeded...if not it assigns a process number to the pcb and alloicates the memoryu for it)
        public load(program: Array<string>, priority: number): number {
            var pcb = new PCB(priority); // initialize the PCB
            this.processes[pcb.processID] = pcb; // set the PCB job
            _MemoryManager.allocateMemory(pcb, program); // alloicate the memory to the pcb (bring in the program)
            return pcb.processID; // return a sucessful int to the shell!
        }
		//checks of the PID already exists
        public doesProcessExist(pid: number): boolean {
			//now used as a shell commmand to see whats loaded!
				if(this.processes[pid] !== null || this.processes[pid] !== undefined){ // if it doesnt NOT exist... send back as true
					return true;
				}else{
					return false;														// not here
				}
        }
		
		//this gets the PID from the PCB
        public getPCB(pid: number): TSOS.PCB {
            return this.processes[pid];
        }
    }
}