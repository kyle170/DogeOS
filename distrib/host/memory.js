var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(size) {
            this.memory = new Array(size); // make sure we know that we're working with memory here!
        }
        Memory.prototype.init = function () {
            for (var i = 0; i < this.memory.length; i++) {
                this.memory[i] = '00';
            }
        };
        Memory.prototype.clearAllMemory = function () {
            for (var i = 0; i < this.memory.length; i++) {
                this.memory[i] = '00';
            }
        };
        Memory.prototype.clearRange = function (start, end) {
            for (var i = 0; i < end; i++) {
                this.memory[start + i] = '00';
            }
        };
        Memory.prototype.getByte = function (memLoc) {
            return this.memory[memLoc];
        };
        Memory.prototype.setByte = function (memLoc, data) {
            this.memory[memLoc] = data;
        };
        Memory.prototype.getSize = function () {
            return this.memory.length;
        };
        Memory.prototype.toString = function () {
            var output = '';
            for (var i = 0; i < this.memory.length; i++) {
                output += this.memory[i] + ' ';
            }
            return output;
        };
        return Memory;
    }());
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
