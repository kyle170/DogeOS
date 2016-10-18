module TSOS {
    export class Memory {
        private memory;						// something to be shared across all things!
		
        constructor(size: number){
            this.memory = new Array(size); // make sure we know that we're working with memory here!
        }
		
        public init(): void { // initalize memory...set as 00
            for(var i = 0; i < this.memory.length; i++){
                this.memory[i] = '00';
            }
        }
		
        public clearAllMemory(): void { //loops throuygh memory and clears it
            for(var i = 0; i < this.memory.length; i++){
                this.memory[i] = '00';
            }
        }
		
        public clearRange(start: number, end: number): void { // clears a range of memory... eg 0-60 instead of the whole block (useful if we want to subdevide in the future)
            for(var i = 0; i < end; i++){
                this.memory[start + i] = '00';
            }
        }
		
        public getByte(memLoc: number): string { // get the byte at the specified location
            return this.memory[memLoc];
        }
		
        public setByte(memLoc: number, data: string): void { //set a byte at the location with the data provided
            this.memory[memLoc] = data;
        }
		
        public getSize(): number { // how big is the memory?
            return this.memory.length;
        }
		
		public toString(){ // using this to print out to the status page
            var output = '';
            for(var i = 0; i < this.memory.length; i++){
                output += this.memory[i] + ' ';
            }
            return output;
        }
    }
}