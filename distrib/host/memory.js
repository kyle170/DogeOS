var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(size) {
            this.memorySize = 0;
            this.memory = new Array(size); // variable read from kernel to set memory size when the OS boots
        }
        Memory.prototype.init = function () {
            //when the memory is created... go through it and set all values at 00 (blank)
            for (var i = 0; i < this.memory.length; i++) {
                this.memory[i] = '00';
            }
            this.memorySize = this.memory.length; // set the memorySize var so other calls can read how many gigabits there are total
        };
        Memory.prototype.getByte = function (memLoc) {
            return this.memory[memLoc];
        };
        Memory.prototype.setByte = function (memLoc, dataToSet) {
            this.memory[memLoc] = dataToSet;
        };
        Memory.prototype.toString = function () {
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
