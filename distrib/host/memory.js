var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(size) {
            this.memorySize = 0;
            this.memory = new Array(size); // variable read from kernel to set memory size when the OS boots
        }
        Memory.prototype.init = function () {
            this.memorySize = this.memory.length; // set the memorySize var so other calls can read how many gigabits there are total
            this.clearMem(); //when the memory is created... go through it and set all values at 00 (blank)
        };
        Memory.prototype.getByte = function (memLoc) {
            //gets the byte in the given location of memory
            return this.memory[memLoc];
        };
        Memory.prototype.setByte = function (memLoc, dataToSet) {
            //sets the byte at the given location in memory
            this.memory[memLoc] = dataToSet;
        };
        Memory.prototype.clearMem = function () {
            //clears the memory (yes... all of it)
            for (var i = 0; i < this.memory.length; i++) {
                this.memory[i] = '00';
            }
        };
        Memory.prototype.toString = function () {
            //used for printing out the memory visually on the GUI
            var output = "";
            for (var i = 0; i < this.memory.length; i++) {
                output += this.memory[i] + ' ';
            }
            return output;
        };
        return Memory;
    }());
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
