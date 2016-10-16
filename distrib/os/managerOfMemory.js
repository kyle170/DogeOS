/*
The butler of memories!
We got 768k to work with!
 */
var TSOS;
(function (TSOS) {
    var ManagerOfMemory = (function () {
        function ManagerOfMemory() {
        }
        ManagerOfMemory.LoadProgram = function (program) {
            //we're going to load the program in here!
            //return the pid if loaded
            var ramBlock = new TSOS.RAM();
            //clear the memory incase something was in there  --- On second thought lets wait to see how this plays out before I go crazy... EDIT: TOO LATE
            for (var i = 0; i < program.length; i++) {
                ramBlock.Set((ManagerOfMemory.ramBlockLocation * 256) + i, program[i]);
            }
            // invoke the PCB and do stuff (mainly we want a PID from this)
            var pcb = new TSOS.ProcessControlBlock();
            pcb.RAMLimit = ManagerOfMemory.ramBlockLocation * 256 + 255; // max is the block its in, multiplied by the size it can be, with a 255 byte overhead
            pcb.RAMBase = ManagerOfMemory.ramBlockLocation * 256; // yayayay
            _KernelResidentQueue.enqueue(pcb); // puts PID in resident queue
            _StdOut.putText("Program Length: " + program.length + " | Stored in RAM Block: " + ManagerOfMemory.ramBlockLocation + " | Bytes: (" + pcb.RAMBase + "-" + (pcb.RAMBase + program.length) + ")");
            _StdOut.advanceLine();
            //things are looking good...lets increase the block location if we're all good here
            ++ManagerOfMemory.ramBlockLocation;
            return pcb.PID;
            //
        };
        ManagerOfMemory.ramBlockLocation = 0; // cause we start at 0 baby!
        return ManagerOfMemory;
    }());
    TSOS.ManagerOfMemory = ManagerOfMemory;
})(TSOS || (TSOS = {}));
