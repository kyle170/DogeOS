module TSOS {
    export class Memory {
		private memory;
		
		constructor(size: number){
			this.memory = new Array(size); // variable read from kernel to set memory size when the OS boots
		}
		
		public init(){ 
			//when the memory is created... go through it and set all values at 00 (blank)
			for(var i:number=0; i<this.memory.length; i++){
				this.memory[i] = '00'; 
			}
		}
		
		public getByte(memLoc: number){
			
		}
		
		public setByte(memLoc: number, dataToSet: string){
			
		}
		
		public toString(): string{
			var output: string = "";
			for (var i: number=0; i<this.memory.length; i++){
				output += this.memory[i]+' ';
			}
			return output;
		}
		
    }
}