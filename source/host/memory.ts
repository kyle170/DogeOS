module TSOS {
    export class Memory {
		private memory;
		public memorySize: number = 0;
		
		constructor(size: number){
			this.memory = new Array(size); // variable read from kernel to set memory size when the OS boots
		}
		
		public init(){ 
			//when the memory is created... go through it and set all values at 00 (blank)
			for(var i:number=0; i<this.memory.length; i++){
				this.memory[i] = '00'; 
			}
			this.memorySize = this.memory.length;	// set the memorySize var so other calls can read how many gigabits there are total
		}
		
		public getByte(memLoc: number): string {
			return this.memory[memLoc];
		}
		
		public setByte(memLoc: number, dataToSet: string): void {
			this.memory[memLoc] = dataToSet;
		}
		
		public clearMem(): void {
			for(var i:number=0; i<this.memorySize; i++){
				this.memory[i] = '00';
			}
		}
		
		public toString(): string {
			var output: string = "";
			for (var i: number=0; i<this.memory.length; i++){
				output += this.memory[i]+' ';
			}
			return output;
		}
		
    }
}