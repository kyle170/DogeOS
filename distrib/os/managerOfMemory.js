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
            var ramAddress = 0; // cause we start at 0 baby!
            //clear the memory incase something was in there  --- On second thought lets wait to see how this plays out before I go crazy... EDIT: TOO LATE
            for (var i = 0; i < program.length; i++) {
                ramBlock.Set(i, program[i]);
            }
            for (var i = 0; i < program.length; i++) {
                _StdOut.putText(JSON.stringify(ramBlock.Get(i)));
                _StdOut.advanceLine();
            }
            return -1;
            //
        };
        return ManagerOfMemory;
    }());
    TSOS.ManagerOfMemory = ManagerOfMemory;
})(TSOS || (TSOS = {}));
