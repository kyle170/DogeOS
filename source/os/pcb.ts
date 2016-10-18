module TSOS {
    export class PCB {
		// allow these to be accessed by other class methods
		static CPid: number = 0;	// want this globally accessable... start with 0
        public Prio: number;		// Importance (remeber that lower is better!)
        public Pid: number;			// Int (PID, its how we identify them)
        public Acc: number;			// Number from 0-255
        public XReg: number;		// Number from 0-255
        public YReg: number;		// Number from 0-255
        public ZFlag: number;		// 0 or 1
        public PC: number;			// Location of current program execution
        public PS: string;			//'NEW', 'READY', 'WAITING', 'HALTED', 'RUNNING', 'TERMINATED'
        public BaseReg: number;		// Where memory access starts
        public LimReg: number;		// Where memory access ends
        		
        constructor(Prio: number){	// things we need to start with Invoke on initial load
			this.Prio = Prio; this.Pid = PCB.CPid++; this.Acc = 0; this.XReg = 0; this.YReg = 0; 
			this.ZFlag = 0; this.PC = 0; this.PS = "NEW"; this.BaseReg = -1; this.LimReg = -1;
        } 
		
        public update_PCB( PC: number, Acc: number, XReg: number, YReg: number, Zflag: number ): void { // give us the old update... err new one!
            this.PC = pc; this.acc = Acc; this.XReg = XReg;
            this.YReg = YReg; this.ZFlag = Zflag;
        }
    } 
}
