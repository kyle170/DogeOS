/* This is the Process Control Block */  

module TSOS {
    export class ProcessControlBlock {
        /*
			0 = new
			1 = running
			2 = waiting
			3 = ready
			4 = terminated
		*/
        public State: number = 0;  	// what state is the program in?
        public X: number = 0;		// X flags
        public Y: number = 0;		// Y Flags
        public Z: number = 0;		// Z Flags (kinda less important...but like...ok...whatever)
		public PID: number = 0;		// Process Identifier... Kinda important
        public Counter: number = 0;	// Because who doesnt liek to count?
        public Accumulator: number = 0;		// I dont know why but I just love the word accumulator
		
        public RamBase: number = 0;			// start of the memory block/address for the program (lower limit)
        public RamLimit: number = 0;		// end of the memory block/address for the program (upper limit)
    }
}