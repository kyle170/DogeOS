module TSOS {
    export class ProcessManager {
        constructor(private maxProcesses: number){
        }
		
		//Initalize the Process Manager class
        public init(): void {
            this.processes = [null];
        }
		
		//This loads the PCB (Process Control Block, adn sees if the max defined value is exceeded...if not it assigns a process number to the pcb and alloicates the memoryu for it)
        public load(program: Array<string>, priority: number): number {
            var pcb = new PCB(priority);
            if(this.processes.length <= this.maxProcesses){
                this.processes[pcb.processID] = pcb;
            }
            _MemoryManager.allocateMemory(pcb, program);
            return pcb.processID;
        }
		//checks of the PID already exists
        public doesProcessExist(pid: number): boolean {
            return (this.processes[pid] !== undefined || this.processes[pid] !== null);
        }
		
		//this gets the PID from the PCB
        public getPCB(pid: number): TSOS.PCB {
            return this.processes[pid];
        }
        private processes;
    }
}