///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module TSOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            // Override the base method pointers.

            // The code below cannot run because "this" can only be
            // accessed after calling super.
            //super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            super();
            this.driverEntry = this.krnKbdDriverEntry;
            this.isr = this.krnKbdDispatchKeyPress;
        }

        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public krnKbdDispatchKeyPress(params) {
            // Parse the params.    TODO: Check that the params are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
            var chr = "";
            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
                ((keyCode >= 97) && (keyCode <= 123))) {  // a..z {
                // Determine the character we want to display.
                // Assume it's lowercase...
                chr = String.fromCharCode(keyCode + 32);
                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);
                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            } else if (((keyCode >= 48) && (keyCode <= 57)) ||   // digits
                        (keyCode == 32)                     ||   // space
                        (keyCode == 13)) {                       // enter
				if(isShifted){ //symbols on the number keys
					var symbolsShift = {48: ")", 49: "!", 50: "@", 51: "#", 52: "$", 53: "%", 54: "^", 55: "&", 56: "*", 57: "(" };
					chr = symbolsShift[keyCode];
					if (!chr){ // if its not a character its nothing
                        chr = "";
                    }
				}else{
					chr = String.fromCharCode(keyCode);
				}
                _KernelInputQueue.enqueue(chr);
            }else if((keyCode >=186) && (keyCode <=222)){ // check for special characters
				if(isShifted){
					var symbolsShift2 = {222: "\"", 221: "}", 220: "|", 219: "{", 192: "~", 191: "?", 190: ">", 189: "_", 188: "<", 187: "+", 186: ":" };
					chr = symbolsShift2[keyCode];
				}else{  // ok, so theres no shift present...that still means we care about the stuff tho
					var symbolsShift3 = {222: "'", 221: "]", 220: "\\", 219: "[", 192: "`", 191: "/", 190: ".", 189: "-", 188: ",", 187: "=", 186: ";" };
					chr = symbolsShift3[keyCode];
				}
				_KernelInputQueue.enqueue(chr);
			}else if(keyCode == 8){ // do we have any backspace or arrow in here?
				if(!isShifted){ // lets make sure things are not shifted
					chr = String.fromCharCode(keyCode);
					_KernelInputQueue.enqueue(chr);
				}
				
			}else if(keyCode == 38 || keyCode == 39 || keyCode == 40){ //arrowzzzzzz
				if(!isShifted){ // lets make sure things are not shifted
					chr = keyCode.toString(); // convert a thing to a string
					_KernelInputQueue.enqueue(chr);
				}
			}else if(keyCode == 9){ // TAB
				if(!isShifted){ // lets make sure things are not shifted
					chr = String.fromCharCode(keyCode);
					_KernelInputQueue.enqueue(chr);
				}
			}
        }
    }
}
