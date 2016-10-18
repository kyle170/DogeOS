module TSOS {
    export class PCB {
		// allow these to be accessed by other class methods
        public priority: number;           // Importance (remeber that lower is better!)
        public processID: number;           // Int (PID, its how we identify them)
        public acc: number;           // Number from 0-255
        public XRegister: number;           // Number from 0-255
        public YRegister: number;           // Number from 0-255
        public ZFlag: number;           // 0 or 1
        public programCounter: number;           // Location of current program execution
        public processState: string; // Enum of 'NEW', 'READY', 'WAITING', 'HALTED', 'RUNNING', 'TERMINATED'
        public baseRegister: number;           // Where memory access starts
        public limitRegister: number;           // Where memory access ends
        
        static currentProcessId: number = 0; // want this globally accessable... start with 0
		
        constructor(priority: number){				// things we need to start with 
			this.priority = priority;
			this.processID = PCB.currentProcessId++;
			this.acc = 0;
			this.XRegister = 0;
			this.YRegister = 0; 
			this.ZFlag = 0;
			this.programCounter = 0;
			this.processState = "NEW";
			this.baseRegister = -1;
			this.limitRegister = -1;
        } 
		
        public update( pc: number, Acc: number, XReg: number, YReg: number, Zflag: number ): void { // give us the old update... err new one!
            this.programCounter = pc;
            this.acc = Acc;
            this.XRegister = XReg;
            this.YRegister = YReg;
            this.ZFlag = Zflag;
        }
    } 
}
