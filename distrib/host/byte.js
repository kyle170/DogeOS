/*
    What is a byte?... Good question! ... this module allows a single byte to represent a byte of data which programs will use!
*/
var TSOS;
(function (TSOS) {
    var Byte = (function () {
        function Byte(hex) {
            this.hexideci = "00";
            this.deciNumb = 0;
            this.hexideci = hex;
            this.deciNumb = parseInt(this.hexideci, 16);
        }
        Byte.prototype.GetDecimal = function () {
            return this.deciNumb;
        };
        Byte.prototype.GetHex = function () {
            return this.hexideci;
        };
        return Byte;
    }());
    TSOS.Byte = Byte;
})(TSOS || (TSOS = {}));
