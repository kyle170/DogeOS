/*
This is the ram... This is where we store our rememberries!
*/
var TSOS;
(function (TSOS) {
    var RAM = (function () {
        function RAM() {
            this.arrRAM = new Array();
        }
        RAM.prototype.Set = function (address, hexValue) {
            this.arrRAM[address] = new TSOS.Byte(hexValue);
        };
        RAM.prototype.Get = function (address) {
            return this.arrRAM[address];
        };
        return RAM;
    }());
    TSOS.RAM = RAM;
})(TSOS || (TSOS = {}));
