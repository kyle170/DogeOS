module TSOS {
    export class Memory {
		private memory;
		public memorySize: number = 0;
		
		constructor(size: number){
			this.memory = new Array(size); // variable read from kernel to set memory size when the OS boots
		}
		
		public init(){ 
			this.memorySize = this.memory.length;	// set the memorySize var so other calls can read how many gigabits there are total
			this.clearMem(); //when the memory is created... go through it and set all values at 00 (blank)
		}
		
		public getByte(memLoc: number): string {
			//gets the byte in the given location of memory
			return this.memory[memLoc];
		}
		
		public setByte(memLoc: number, dataToSet: string): void {
			//sets the byte at the given location in memory
			this.memory[memLoc] = dataToSet;
		}
		
		public clearMem(): void {
			//clears the memory (yes... all of it)
			for(var i:number=0; i<this.memory.length; i++){
				this.memory[i] = '00';
			}
		}
		
		public toString(): string {
			//used for printing out the memory visually on the GUI
			var output: string = "";
			for (var i: number=0; i<this.memory.length; i++){
				output += this.memory[i]+' ';
			}
			return output;
		}
    }
}