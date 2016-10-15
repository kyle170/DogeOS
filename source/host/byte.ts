/* 
    What is a byte?... Good question! ... this module allows a single byte to represent a byte of data which programs will use!
*/

module TSOS {
    export class Byte {
        private hexideci: string = "00";
        private deciNumb: number = 0;

        constructor(hex: string) { // hex coming in as strings and out as decimals.. gg
            this.hexideci = hex;
            this.deciNumb = parseInt(this.hexideci, 16);
        }

        public GetDecimal(): number { // get the decimal equivalent
            return this.deciNumb;
        }

        public GetHex(): string {  // get the string equivalent
            return this.hexideci;
        }
    }
}