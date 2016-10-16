module TSOS {
    export class MemoryManager {
        private memorySize;
        private allocated;
        private numOfBlocks;
        constructor(maxProcesses: number){
            this.memorySize = _Memory.getSize();
            this.numOfBlocks = this.memorySize/maxProcesses;
            this.allocated = new Array(maxProcesses);
            for(var i = 0; i < this.allocated.length; i++){
                this.allocated[i] = -1;
            }
        }

        public init(): void {
        }

        public read(pcb: TSOS.PCB, loc: number): string {
            
        }

        public write(pcb: TSOS.PCB, loc: number, data: string): void {
			
        }

        public allocateMemory(pcb: TSOS.PCB, program: Array<string>): void {
            
        }

        public deallocateMemory(pcb: TSOS.PCB): void {
            
        }
    }
}