///<reference path="../globals.ts" />
/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */
var TSOS;
(function (TSOS) {
    var Console = (function () {
        function Console(currentFont, currentFontSize, currentXPosition, currentYPosition, buffer, current_line, command_history_position, command_history) {
            if (currentFont === void 0) { currentFont = _DefaultFontFamily; }
            if (currentFontSize === void 0) { currentFontSize = _DefaultFontSize; }
            if (currentXPosition === void 0) { currentXPosition = 0; }
            if (currentYPosition === void 0) { currentYPosition = _DefaultFontSize; }
            if (buffer === void 0) { buffer = ''; }
            if (current_line === void 0) { current_line = ''; }
            if (command_history_position === void 0) { command_history_position = 0; }
            if (command_history === void 0) { command_history = new Array(); }
            this.currentFont = currentFont;
            this.currentFontSize = currentFontSize;
            this.currentXPosition = currentXPosition;
            this.currentYPosition = currentYPosition;
            this.buffer = buffer;
            this.current_line = current_line;
            this.command_history_position = command_history_position;
            this.command_history = command_history;
        }
        Console.prototype.init = function () {
            this.clearScreen();
            this.resetXY();
        };
        Console.prototype.clearScreen = function () {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        };
        Console.prototype.resetXY = function () {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        };
        Console.prototype.handleInput = function () {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) {
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
                    this.command_history.push(this.buffer);
                    // ... and reset our buffer.
                    this.buffer = "";
                    this.current_line = "";
                    this.command_history_position++;
                }
                else if (chr === String.fromCharCode(38) + "!") {
                    this.command_history_up();
                }
                else if (chr === String.fromCharCode(40) + "!") {
                    this.command_history_down();
                }
                else if (chr === String.fromCharCode(9)) {
                    this.tab_completion();
                }
                else if (chr === String.fromCharCode(8)) {
                    this.removeLastCharacter();
                    this.buffer = this.buffer.substring(0, this.buffer.length - 1); // its one shorter now
                    this.current_line = this.current_line.substring(0, this.current_line.length - 1); // its one shorter now
                }
                else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen... 
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                    this.current_line += chr;
                }
            }
        };
        Console.prototype.bsod = function () {
            //make the bluescreen thing a thing!
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
            _DrawingContext.rect(0, 0, _Canvas.width, _Canvas.height);
            _DrawingContext.fillStyle = "blue";
            _DrawingContext.fill();
        };
        Console.prototype.putText = function (text) {
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
                if (this.current_line.length > wordWrapLength) {
                    this.current_line = "";
                    this.advanceLine();
                }
                if (text.substring(0, wordWrapLength).length != 0 && text.length > wordWrapLength) {
                    this.advanceLine();
                    this.putText(text.substring(wordWrapLength));
                }
            }
        };
        Console.prototype.advanceLine = function () {
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
            if (this.currentYPosition > _Canvas.height) {
                // lets take what we see in the console, convert it to an image, move it slightly upwards so the oldest stuff just is cropped out and move the line space back up a few ticks so we dont loose it into oblivion
                var imageOCanvas = _DrawingContext.getImageData(0, lineNewSpace, _Canvas.width, _Canvas.height);
                //moving things down
                _DrawingContext.putImageData(imageOCanvas, 0, 0);
                this.currentYPosition -= lineNewSpace;
            }
        };
        Console.prototype.removeLastCharacter = function () {
            _DrawingContext.clearRect(12, (this.currentYPosition - 20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12)); // put a nothing over where text used to be
            var newSubstringDisplay = this.buffer.substring(0, (this.buffer.length - 1)); //remove 1 from the buffer
            this.currentXPosition = 12; // take into acct the >
            this.putText(newSubstringDisplay); // draw the shorter string
        };
        Console.prototype.command_history_up = function () {
            if (this.command_history_position > 0) {
                this.command_history_position--;
                _DrawingContext.clearRect(12, (this.currentYPosition - 20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12));
                this.currentXPosition = 12; // take into acct the >
                this.buffer = this.command_history[this.command_history_position];
                this.current_line = this.command_history[this.command_history_position];
                this.putText(this.command_history[this.command_history_position]); // draw the shorter string
            }
        };
        Console.prototype.command_history_down = function () {
            if (this.command_history_position < this.command_history.length - 1) {
                this.command_history_position++;
                _DrawingContext.clearRect(12, (this.currentYPosition - 20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12));
                this.currentXPosition = 12; // take into acct the >
                this.buffer = this.command_history[this.command_history_position];
                this.current_line = this.command_history[this.command_history_position];
                this.putText(this.command_history[this.command_history_position]); // draw the shorter string
            }
        };
        Console.prototype.tab_completion = function () {
            var arr = Object.keys(objSharedCommandList).map(function (key) { return objSharedCommandList[key]; }); // change object array to normal string array
            for (var i = 0; i < objSharedCommandList.length; i++) {
                officialCommandList[i] = arr[i]["command"];
            }
            var prefixTextToFind = this.buffer; //what we want to find
            var matches = officialCommandList.filter(function (officialCommandListValue) {
                if (officialCommandListValue) {
                    return (officialCommandListValue.substring(0, prefixTextToFind.length) === prefixTextToFind);
                }
            });
            if (matches.length == 1) {
                _DrawingContext.clearRect(12, (this.currentYPosition - 20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12)); // clear the room
                this.currentXPosition = 12; // take into acct the >
                this.buffer = matches[0];
                this.current_line = matches[0];
                this.putText(matches[0]); // print out first match
            }
            else {
                _DrawingContext.clearRect(12, (this.currentYPosition - 20), _DrawingContext.measureText(this.currentFont, this.currentFontSize, this.buffer), (this.currentYPosition + 12)); // clear the room
                this.putText("Suggested Commands: " + matches.toString()); // print out first match
                this.advanceLine();
                this.putText(">"); // print out first match
                this.putText(this.buffer); // print out first match
            }
        };
        return Console;
    }());
    TSOS.Console = Console;
})(TSOS || (TSOS = {}));
