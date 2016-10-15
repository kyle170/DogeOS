/* 
This is the ram... This is where we store our rememberries!
*/   

module TSOS {
    export class RAM {
        private arrRAM: Array<Byte>;

        constructor(){
            this.arrRAM = new Array<Byte>();
        }

        public Set(address: number, hexValue: string): void { // lets put a piece of info in a specified address of our awesome RAM!
             this.arrRAM[address] = new Byte(hexValue);
        }

        public Get(address: number): Byte { // get a byte from a address in the ram
            return this.arrRAM[address];
        }
    }
}