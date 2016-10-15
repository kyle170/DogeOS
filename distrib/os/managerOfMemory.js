/*
The butler of memories!
We got 768k to work with!
 */
var TSOS;
(function (TSOS) {
    var ManagerOfMemory = (function () {
        function ManagerOfMemory() {
        }
        ManagerOfMemory.prototype.LoadProg = function (program) {
            //we're going to load the program in here!
            //return the pid if loaded
            return 1;
        };
        return ManagerOfMemory;
    }());
    TSOS.ManagerOfMemory = ManagerOfMemory;
})(TSOS || (TSOS = {}));
