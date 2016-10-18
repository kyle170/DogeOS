var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(size) {
            this.memory = new Array(size); // variable read from kernel to set memory size when the OS boots
        }
        Memory.prototype.init = function () {
            //when the memory is created... go through it and set all values at 00 (blank)
            for (var i = 0; i < this.memory.length; i++) {
                this.memory[i] = '00';
            }
        };
        Memory.prototype.getByte = function (memLoc) {
        };
        Memory.prototype.setByte = function (memLoc, dataToSet) {
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
