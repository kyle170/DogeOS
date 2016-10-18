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

        public read(pcb: TSOS.PCB, memloc: number): string {
			var byteMem = "";
            if(memloc >= 0 && memloc < 256){
                byteMem = _Memory.getByte(pcb.baseRegister + memloc);
            } else {
                // TODO Throw memory access error
            }
			 return byteMem;
        }

        public write(pcb: TSOS.PCB, memloc: number, data: string): void {
            if(memloc >= 0 && memloc < 256){
                return _Memory.setByte(pcb.baseRegister + memloc, data);
            } else {
                // TODO Throw memory access error
            }
        }

        public allocateMemory(pcb: TSOS.PCB, program: Array<string>): void {
            for(var i = 0; i < this.allocated.length; i++){
                if(this.allocated[i] === -1){
                    this.allocated[i] = pcb.processID;
                    pcb.baseRegister = i * 256;
                    pcb.limitRegister = pcb.baseRegister + 255;
                    break;
                }
            }
            if(pcb.baseRegister === -1){
                // TODO Error handling no more space to allocate
                alert("BASE REGISTER NOT SET");
            }
            for(var i = 0; i < 256; i++){
                var code = program[i];
                _Memory.setByte(pcb.baseRegister + i, (code !== undefined) ? code : '00');
            }
        }

        public deallocateMemory(pcb: TSOS.PCB): void {
            // going to wait on this to do it!
        }
    }
}