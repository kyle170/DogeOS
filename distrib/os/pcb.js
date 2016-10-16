/* This is the Process Control Block

Is it bad everytime I hear `pcb` I think of a printed circuit board?.... yes?.... ok :/
 */
var TSOS;
(function (TSOS) {
    var ProcessControlBlock = (function () {
        function ProcessControlBlock() {
            this.State = 0; // what state is the program in?
            this.X = 0; // X flags
            this.Y = 0; // Y Flags
            this.Z = 0; // Z Flags (kinda less important...but like...ok...whatever... its only a boolean really... may change it later down the road)
            this.PID = ++ProcessControlBlock.LatestPID; // Process Identifier... Kinda important
            this.Counter = 0; // Because who doesnt liek to count?
            this.Accumulator = 0; // I dont know why but I just love the word accumulator
            this.RAMBase = 0; // start of the memory block/address for the program (lower limit)
            this.RAMLimit = 0; // end of the memory block/address for the program (upper limit)
        }
        /*
            --- A little cheatcheat and remindwer for the states ---
            0 = new
            1 = running
            2 = waiting
            3 = ready
            4 = terminated
        */
        ProcessControlBlock.LatestPID = -1; // number of programs loaded so far (also PID assigner)
        return ProcessControlBlock;
    }());
    TSOS.ProcessControlBlock = ProcessControlBlock;
})(TSOS || (TSOS = {}));
