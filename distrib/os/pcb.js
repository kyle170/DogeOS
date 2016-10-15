/* This is the Process Control Block */
var TSOS;
(function (TSOS) {
    var ProcessControlBlock = (function () {
        function ProcessControlBlock() {
            /*
                0 = new
                1 = running
                2 = waiting
                3 = ready
                4 = terminated
            */
            this.State = 0; // what state is the program in?
            this.X = 0; // X flags
            this.Y = 0; // Y Flags
            this.Z = 0; // Z Flags (kinda less important...but like...ok...whatever)
            this.PID = 0; // Process Identifier... Kinda important
            this.Counter = 0; // Because who doesnt liek to count?
            this.Accumulator = 0; // I dont know why but I just love the word accumulator
            this.RamBase = 0; // start of the memory block/address for the program (lower limit)
            this.RamLimit = 0; // end of the memory block/address for the program (upper limit)
        }
        return ProcessControlBlock;
    }());
    TSOS.ProcessControlBlock = ProcessControlBlock;
})(TSOS || (TSOS = {}));
