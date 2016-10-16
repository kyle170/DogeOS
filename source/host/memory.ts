module TSOS {
    export class Memory {
        private memory;
        constructor(size: number){
            this.memory = new Array(size);
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
        public getByte(loc: number): string { // get the byte at the specified location
            return this.memory[loc];
        }
        public setByte(loc: number, data: string): void { //set a byte at the location with the data provided
            this.memory[loc] = data;
        }
        public getSize(): number { // how big is the memory?
            return this.memory.length;
        }
		public printMem(){ // lets echo this out to the console shall we?
            console.log(this.memory);
        }
		public toString(){
            var output = '';
            for(var i = 0; i < this.memory.length; i++){
                output += this.memory[i] + ' ';
            }
            return output;
        }
    }
}