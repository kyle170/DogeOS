///<reference path="../globals.ts" />

/* ------------
   CPU.ts

   Requires global.ts.

   Routines for the host CPU simulation, NOT for the OS itself.
   In this manner, it's A LITTLE BIT like a hypervisor,
   in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
   that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
   TypeScript/JavaScript in both the host and client environments.

   This code references page numbers in the text book:
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */
   
module TSOS {
    export class Cpu {
        constructor(
                public PC:          number   = 0,
                public Acc:         number   = 0,
                public Xreg:        number   = 0,
                public Yreg:        number   = 0,
                public Zflag:       number   = 0,
                public isExecuting: boolean  = false,
                public currentPCB:  TSOS.PCB = null
                ) {
        }

        public init(): void {
        }

        private loadFromPCB(): void {
            
        }

        public runProcess(pid: number):void {
            
        }

        public loadProgram(pcb: TSOS.PCB): void {
            
        }

        public updatePCB(): void {
            
        }

        public cycle(): void {
            //this.PC = this.PC % (this.currentPCB.limitRegister - this.currentPCB.baseRegister);
            //TSOS.Control.updateMemoryDisplay();
            _Kernel.krnTrace('CPU cycle');
            // TODO: Accumulate CPU usage and profiling statistics here. 
            
        } // End of cycle
    }
}