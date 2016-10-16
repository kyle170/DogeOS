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
            var ramBlockLocation = 0; // cause we start at 0 baby!
            //clear the memory incase something was in there  --- On second thought lets wait to see how this plays out before I go crazy... EDIT: TOO LATE
            for (var i = 0; i < program.length; i++) {
                ramBlock.Set(i, program[i]);
            }
            // invoke the PCB and do stuff (mainly we want a PID from this)
            var pcb = new TSOS.ProcessControlBlock();
            pcb.RAMLimit = ramBlockLocation * 256 + 255; // max is the block its in, multiplied by the size it can be, with a 255 byte overhead
            pcb.RAMBase = ramBlockLocation * 256; // yayayay
            return pcb.PID;
            //
        };
        return ManagerOfMemory;
    }());
    TSOS.ManagerOfMemory = ManagerOfMemory;
})(TSOS || (TSOS = {}));
