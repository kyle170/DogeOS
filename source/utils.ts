/* --------
   Utils.ts

   Utility functions.
   -------- */

module TSOS {

    export class Utils {

        public static trim(str): string {
            // Use a regular expression to remove leading and trailing spaces.
            return str.replace(/^\s+ | \s+$/g, "");
            /*
            Huh? WTF? Okay... take a breath. Here we go:
            - The "|" separates this into two expressions, as in A or B.
            - "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
            - "\s+$" is the same thing, but at the end of the string.
            - "g" makes is global, so we get all the whitespace.
            - "" is nothing, which is what we replace the whitespace with.
            */ 
        }

        public static rot13(str: string): string {
            /*
               This is an easy-to understand implementation of the famous and common Rot13 obfuscator.
               You can do this in three lines with a complex regular expression, but I'd have
               trouble explaining it in the future.  There's a lot to be said for obvious code.
            */
            var retVal: string = "";
            for (var i in <any>str) {    // We need to cast the string to any for use in the for...in construct.
                var ch: string = str[i];
                var code: number = 0;
                if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                    code = str.charCodeAt(Number(i)) + 13;  // It's okay to use 13.  It's not a magic number, it's called rot13.
                    retVal = retVal + String.fromCharCode(code);
                } else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                    code = str.charCodeAt(Number(i)) - 13;  // It's okay to use 13.  See above.
                    retVal = retVal + String.fromCharCode(code);
                } else {
                    retVal = retVal + ch;
                }
            }
            return retVal;
        }
		
		//converts the incoming string that we found in the id="taProgramInput" to something a little more usable...such as...oh...I dont know... HEX???!?!
		public static stringToHex(input: string ): string{
			var output: string = "";
			// go through each character and push it to a 16 char string
			for (var i: number = 0; i < input.length; i++){
				output += input.charCodeAt(i).toString(16);
			}
			//now that we've broken it up...send it out!
			return output;
		}
		
		// thje hex will now be converted to something a little more readable...maybe?
        public static HexToS(input: string): string{
            var output: string = "";
            for (var i: number = 0; i < input.length; ++i){
				++i;
                output += String.fromCharCode(parseInt(input.substr(i, 2), 16));
            }
            return output;
        }

        // String ->  Hex conversion check... true = hex, false = NOPE
        public static checkForValidHex(input: string): boolean{
            if (input.length == 2 && parseInt(input, 16) >= 0){ // gotta be 2 in length and the 16 in length is greater than 0 when parsed.
                return true; // this is hex
            }else{
                return false; // this is not hex
            }
        }
		

    }
}
