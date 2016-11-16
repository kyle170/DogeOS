///<reference path="../globals.ts" />

/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */

module TSOS {

    export class Console {

        constructor(public currentFont = _DefaultFontFamily,
                    public currentFontSize = _DefaultFontSize,
                    public currentXPosition = 0,
                    public currentYPosition = _DefaultFontSize,
					public buffer = '',
					public current_line = '',
					public command_history_position = 0,
                    public command_history = new Array()) {
        }

        public init(): void {
            this.clearScreen();
            this.resetXY();
        }

        private clearScreen(): void {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        }

        private resetXY(): void {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        }

        public handleInput(): void {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) { //     Enter key
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
					this.command_history.push(this.buffer); 
                    // ... and reset our buffer.
                    this.buffer = "";
					this.current_line = "";
					this.command_history_position++;
				}else if (chr === String.fromCharCode(38)+"!"){ // up arrow
					this.command_history_up();
				}else if (chr === String.fromCharCode(40)+"!"){ // down arrow
					this.command_history_down();
				}else if (chr === String.fromCharCode(9)){ // tab
					this.tab_completion();
				}else if (chr === String.fromCharCode(8)){ //backspace detected!
					this.removeLastCharacter();
					this.buffer = this.buffer.substring(0, this.buffer.length-1); // its one shorter now
					this.current_line = this.current_line.substring(0, this.current_line.length-1); // its one shorter now
                } else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen... 
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
					this.current_line += chr;
                }
                // TODO: Write a case for Ctrl-C.
            }
        }
		
		public bsod(): void{
			//make the bluescreen thing a thing!
			_DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
			_DrawingContext.rect(0, 0, _Canvas.width, _Canvas.height);
			_DrawingContext.fillStyle = "blue";
			_DrawingContext.fill();
		}

        public putText(text): void {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            //
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            //         Consider fixing that.
			var wordWrapLength = 80; 
			var newSubstringDisplay = text.substring(0, wordWrapLength);
            if (text !== "") {
				// Draw the text at the current X and Y coordinates.
				_DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, newSubstringDisplay);
				// Move the current X position.
				var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, newSubstringDisplay);
				this.currentXPosition = this.currentXPosition + offset;
				
				if( this.current_line.length > wordWrapLength ){ // wrap the buffer!
					this.current_line = "";
					this.advanceLine();
				}
				if(text.substring(0, wordWrapLength).length != 0 && text.length > wordWrapLength){
					this.advanceLine();
					this.putText(text.substring(wordWrapLength));
				}
            }
         }

        public advanceLine(): void {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            this.currentYPosition += _DefaultFontSize + 
                                     _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                                     _FontHeightMargin;
			
			var lineNewSpace = this.currentFontSize + 12; // does 12 sound good for an offset?
			if (this.currentYPosition > _Canvas.height)
            {
				// lets take what we see in the console, convert it to an image, move it slightly upwards so the oldest stuff just is cropped out and move the line space back up a few ticks so we dont loose it into oblivion
                var imageOCanvas = _DrawingContext.getImageData(0, lineNewSpace, _Canvas.width, _Canvas.height);
				//moving things down
                _DrawingContext.putImageData(imageOCanvas, 0, 0);
                this.currentYPosition -= lineNewSpace;
            }
        }
		
		public removeLastCharacter(): void{  // this is to handle backspaces
			_DrawingContext.clearRect(12, (this.currentYPosition-20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12)); // put a nothing over where text used to be
			var newSubstringDisplay = this.buffer.substring(0, (this.buffer.length-1)); //remove 1 from the buffer
			this.currentXPosition = 12; // take into acct the >
			this.putText(newSubstringDisplay); // draw the shorter string
		}
		
		public command_history_up(): void {
			if(this.command_history_position>0){
				this.command_history_position--;
				_DrawingContext.clearRect(12, (this.currentYPosition-20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12)); 
				this.currentXPosition = 12; // take into acct the >
				this.buffer = this.command_history[this.command_history_position];
				this.current_line = this.command_history[this.command_history_position];
				this.putText(this.command_history[this.command_history_position]); // draw the shorter string
			}
			
		}
		public command_history_down(): void {
			if(this.command_history_position<this.command_history.length-1){
				this.command_history_position++;
				_DrawingContext.clearRect(12, (this.currentYPosition-20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12)); 
				this.currentXPosition = 12; // take into acct the >
				this.buffer = this.command_history[this.command_history_position];
				this.current_line = this.command_history[this.command_history_position];
				this.putText(this.command_history[this.command_history_position]); // draw the shorter string
			}
			
		}
		
		public tab_completion(): void {
			var arr = Object.keys(objSharedCommandList).map(function (key) { return objSharedCommandList[key]; }); // change object array to normal string array
			for(var i=0; i<objSharedCommandList.length; i++){ // go through and break off the commands
				officialCommandList[i] = arr[i]["command"];
			}
			var prefixTextToFind = this.buffer; //what we want to find
			var matches = officialCommandList.filter(function(officialCommandListValue){ // do the thing!
				if(officialCommandListValue) {
					return (officialCommandListValue.substring(0, prefixTextToFind.length) === prefixTextToFind);
				}
			});
			if(matches.length == 1){ // make sure we have something that matches before we replace the buffer
				_DrawingContext.clearRect(12, (this.currentYPosition-20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12));  // clear the room
				this.currentXPosition = 12; // take into acct the >
				this.buffer = matches[0];
				this.current_line = matches[0];
				this.putText(matches[0]); // print out first match
			}else{
				_DrawingContext.clearRect(12, (this.currentYPosition-20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12));  // clear the room
				this.putText("Suggested Commands: "+ matches.toString()); // print out first match
				this.advanceLine();
				this.putText(">"); // print out first match
				this.putText(this.buffer); // print out first match
			}
		}
		
    }
 }
