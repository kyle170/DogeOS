///<reference path="../globals.ts" />
///<reference path="../utils.ts" />
///<reference path="shellCommand.ts" />
///<reference path="userCommand.ts" />
/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */
// TODO: Write a base class / prototype for system services and let Shell inherit from it.
var TSOS;
(function (TSOS) {
    var Shell = (function () {
        function Shell() {
            // Properties 
            this.promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
        }
        Shell.prototype.init = function () {
            var sc;
            //
            // Load the command list. 
            // ver
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;
            // help
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            // shutdown
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            // cls
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            // man <topic>
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            // trace <on | off>
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            // rot13 <string>
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            // prompt <string>
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            // date
            sc = new TSOS.ShellCommand(this.shellDate, "date", "- displays the current date and time");
            this.commandList[this.commandList.length] = sc;
            // whereami
            sc = new TSOS.ShellCommand(this.shellWhereami, "whereami", "- displays the location of the user");
            this.commandList[this.commandList.length] = sc;
            // haiku
            sc = new TSOS.ShellCommand(this.shellHaiku, "haiku", "- generates a Haiku just for you");
            this.commandList[this.commandList.length] = sc;
            // status
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "- sets stats above the console");
            this.commandList[this.commandList.length] = sc;
            // blue screen of death
            sc = new TSOS.ShellCommand(this.shellBSOD, "bsod", "- simulates a blue screen of death");
            this.commandList[this.commandList.length] = sc;
            // load a program
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "- loads a program in the User Program Input");
            this.commandList[this.commandList.length] = sc;
            // run a program
            sc = new TSOS.ShellCommand(this.shellRun, "run", "- runs a loaded program given a PID value");
            this.commandList[this.commandList.length] = sc;
            // doge
            sc = new TSOS.ShellCommand(this.shellDoge, "doge", "- Lets WOW things up a little!");
            this.commandList[this.commandList.length] = sc;
            // music
            sc = new TSOS.ShellCommand(this.shellMusic, "music", "- Music from https://www.youtube.com/watch?v=cA9g-YjfGxo");
            this.commandList[this.commandList.length] = sc;
            // runall
            sc = new TSOS.ShellCommand(this.shellRunAll, "runall", "- runs all loaded programs");
            this.commandList[this.commandList.length] = sc;
            // clearmem
            sc = new TSOS.ShellCommand(this.shellClearMemory, "clearmem", "- clears all memory");
            this.commandList[this.commandList.length] = sc;
            // killall
            sc = new TSOS.ShellCommand(this.shellKillAll, "killall", "- DESTORY ALL THE PROCESSES");
            this.commandList[this.commandList.length] = sc;
            // kill
            sc = new TSOS.ShellCommand(this.shellKill, "kill", "- kills a process");
            this.commandList[this.commandList.length] = sc;
            // ps
            sc = new TSOS.ShellCommand(this.shellPS, "ps", "- lists running processes");
            this.commandList[this.commandList.length] = sc;
            // quantium
            sc = new TSOS.ShellCommand(this.shellQuantium, "quantum", "- sets the quantium for RR scheduling (Ex: quantium 4 )");
            this.commandList[this.commandList.length] = sc;
            // format
            sc = new TSOS.ShellCommand(this.shellFormat, "format", "- formats the system drive");
            this.commandList[this.commandList.length] = sc;
            // create
            sc = new TSOS.ShellCommand(this.shellCreate, "create", "- creates the file with the inputted file <filename>");
            this.commandList[this.commandList.length] = sc;
            // read
            sc = new TSOS.ShellCommand(this.shellRead, "read", "- reads the specified file from the HDD");
            this.commandList[this.commandList.length] = sc;
            // write
            sc = new TSOS.ShellCommand(this.shellWrite, "write", "- writes a file to memory");
            this.commandList[this.commandList.length] = sc;
            // delete
            sc = new TSOS.ShellCommand(this.shellDelete, "delete", "- deletes a file from memory");
            this.commandList[this.commandList.length] = sc;
            // ls
            sc = new TSOS.ShellCommand(this.shellls, "ls", "- returns a list of files in the current directory");
            this.commandList[this.commandList.length] = sc;
            // set schedule
            sc = new TSOS.ShellCommand(this.shellSetSchedule, "setschedule", "- Sets the schedule of the CPU");
            this.commandList[this.commandList.length] = sc;
            // get schedule
            sc = new TSOS.ShellCommand(this.shellGetSchedule, "getschedule", "- Displays current CPU scheduling mode");
            this.commandList[this.commandList.length] = sc;
            objSharedCommandList = this.commandList;
            //
            // Display the initial prompt.
            this.putPrompt();
        };
        Shell.prototype.putPrompt = function () {
            _StdOut.putText(this.promptStr);
        };
        Shell.prototype.handleInput = function (buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match.  TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            }
            else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) {
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {
                    this.execute(this.shellApology);
                }
                else {
                    this.execute(this.shellInvalidCommand);
                }
            }
        };
        // Note: args is an option parameter, ergo the ? which allows TypeScript to understand that.
        Shell.prototype.execute = function (fn, args) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        };
        Shell.prototype.parseInput = function (buffer) {
            var retVal = new TSOS.UserCommand();
            // 1. Remove leading and trailing spaces.
            buffer = TSOS.Utils.trim(buffer);
            // 2. Lower-case it.
            buffer = buffer.toLowerCase();
            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");
            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift(); // Yes, you can do that to an array in JavaScript.  See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = TSOS.Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;
            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        };
        //
        // Shell Command Functions.  Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        Shell.prototype.shellInvalidCommand = function () {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        };
        Shell.prototype.shellCurse = function () {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        };
        Shell.prototype.shellApology = function () {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        };
        Shell.prototype.shellVer = function (args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
            _StdOut.advanceLine();
            _StdOut.putText("                            __");
            _StdOut.advanceLine();
            _StdOut.putText('     ,                    ," e`--o');
            _StdOut.advanceLine();
            _StdOut.putText("    ((                   (  | __,'");
            _StdOut.advanceLine();
            _StdOut.putText("     \\~-----------' \_;/     ~Woof!");
            _StdOut.advanceLine();
            _StdOut.putText("     (                      /");
            _StdOut.advanceLine();
            _StdOut.putText("     /) ._______________.  )");
            _StdOut.advanceLine();
            _StdOut.putText("    (( (               (( (");
            _StdOut.advanceLine();
            _StdOut.putText("     ``-'               ``-'");
            _StdOut.advanceLine();
            _StdOut.advanceLine();
            _StdOut.putText(">> Here... Have somewhat eh ascii art of a dog :/  <<");
        };
        Shell.prototype.shellDate = function (args) {
            var m = new Date();
            var dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
            _StdOut.putText("The date & time is: " + dateString);
        };
        Shell.prototype.shellWhereami = function (args) {
            var states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
            var state = states[Math.floor(Math.random() * states.length)];
            _StdOut.putText("Believe it or not, you are actually in " + state);
        };
        Shell.prototype.shellHaiku = function (args) {
            //things and stuff...nothing to see here
            var adjective1 = new Array("sad", "young", "happy", "coward", "brave", "little");
            var verb1 = new Array("runs", "sleeps", "seeks", "eats", "fight", "dream");
            var adverb2 = new Array("quickly", "fully", "dimly", "hotly", "quite", "loudly");
            var noun1 = new Array("colonist", "pirate", "slave", "raider", "muffalo", "boomrat");
            var preposition2 = new Array("over", "under", "astride", "towards", "along", "backwards");
            var article1 = new Array("the", "this", "that", "our", "a", "some");
            var adjective2 = new Array("cold", "rough", "hot", "hidden", "red", "dark");
            var noun2 = new Array("desert", "mountain", "cave", "hill", "plain", "ruins");
            var verb2 = new Array("speaking", "hunting", "jumping", "running", "working", "watching");
            var adverb3 = new Array("quietly", "gracefully", "knowingly", "peacefully", "intently", "silently");
            var arNums = new Array();
            //go through everything
            for (var i = 0; i < 10; i++) {
                arNums[i] = Math.round(Math.random() * 5);
            }
            //time to build!
            var haiku = adjective1[arNums[0]] + " ";
            haiku += noun1[arNums[1]] + " ";
            haiku += adverb2[arNums[2]] + " ";
            haiku += verb1[arNums[3]] + " ";
            var haiku2 = preposition2[arNums[4]] + " ";
            haiku2 += article1[arNums[5]] + " ";
            haiku2 += adjective2[arNums[6]] + " ";
            haiku2 += noun2[arNums[7]] + " ";
            var haiku3 = verb2[arNums[8]] + " ";
            haiku3 += adverb3[arNums[9]] + " ";
            //Print dammit... DID I STUDDAH?
            _StdOut.putText(haiku);
            _StdOut.advanceLine();
            _StdOut.putText(haiku2);
            _StdOut.advanceLine();
            _StdOut.putText(haiku3);
        };
        Shell.prototype.shellStatus = function (args) {
            if (args.length > 0) {
                var statusMessage = "";
                for (var i = 0; i < args.length; i++) {
                    statusMessage += args[i] + " ";
                }
                document.getElementById('statusArea').innerHTML = statusMessage;
            }
        };
        Shell.prototype.shellHelp = function (args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        };
        Shell.prototype.shellShutdown = function (args) {
            _StdOut.putText("Shutting down...");
            // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        };
        Shell.prototype.shellCls = function (args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        };
        Shell.prototype.shellMan = function (args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    // TODO: Make descriptive MANual page entries for the the rest of the shell commands here.
                    case "ver":
                        _StdOut.putText("Displays the current version data");
                        break;
                    case "shutdown":
                        _StdOut.putText("Shuts the kernel off");
                        break;
                    case "cls":
                        _StdOut.putText("This command clears the screen adn resets the cursor postition");
                        break;
                    case "man":
                        _StdOut.putText("Need Help?... You've come to the right place! You used `man` to get here so its kinda redundant on what it does... You can go away now...");
                        break;
                    case "trace":
                        _StdOut.putText("This enables the OS trace");
                        break;
                    case "rot13":
                        _StdOut.putText("Need to obfuscate something?... good... use the command rot13 followed by the string you want to obfuscate... like this! rot13 Alan");
                        break;
                    case "prompt":
                        _StdOut.putText("This is pretty obvious...");
                        break;
                    case "date":
                        _StdOut.putText("displays the date dummy!");
                        break;
                    case "whereami":
                        _StdOut.putText("You should really know where you are...seriously");
                        break;
                    case "haiku":
                        _StdOut.putText("generates a haiku just for you!");
                        break;
                    case "status":
                        _StdOut.putText("Sets a new status message above the console... just use status <message>");
                        break;
                    case "bsod":
                        _StdOut.putText("Simulates a blue screen of death...");
                        break;
                    case "load":
                        _StdOut.putText("run this command after you have valid hex inputed intop the User Program Input");
                        break;
                    case "run":
                        _StdOut.putText("run will execute the program with the PID that is specified... Ex: run 0");
                        break;
                    case "doge":
                        _StdOut.putText("Get comments from the doge... Who knows what hes going to say?");
                        break;
                    case "music":
                        _StdOut.putText("Plays music from https://www.youtube.com/watch?v=cA9g-YjfGxo");
                        _StdOut.advanceLine();
                        break;
                    case "runall":
                        _StdOut.putText("Runs all loaded PID's");
                        _StdOut.advanceLine();
                        break;
                    case "clearmem":
                        _StdOut.putText("Clears all memory");
                        _StdOut.advanceLine();
                        break;
                    case "killall":
                        _StdOut.putText("Clears all processes");
                        _StdOut.advanceLine();
                        break;
                    case "kill":
                        _StdOut.putText("Kills a singular process with a given PiD, (Ex: kill 2)");
                        _StdOut.advanceLine();
                        break;
                    case "ps":
                        _StdOut.putText("Lists the processes that are currently running");
                        _StdOut.advanceLine();
                        break;
                    case "quantum":
                        _StdOut.putText("Sets the Round Robbin Quantum scheduling interrupt algorithm for the CPU");
                        _StdOut.advanceLine();
                        break;
                    case "format":
                        _StdOut.putText("Format's the drive to prepare for its use.");
                        _StdOut.advanceLine();
                        break;
                    case "create":
                        _StdOut.putText("Creates a file with the parameter of <filename>");
                        _StdOut.advanceLine();
                        break;
                    case "read":
                        _StdOut.putText("Reads a file from memory; ex: read doge");
                        _StdOut.advanceLine();
                        break;
                    case "write":
                        _StdOut.putText('Writes an existing file to memory.. PLEASE USE QUOTES AROUND YOUR DATA, ex; write doge "woof" ');
                        _StdOut.advanceLine();
                        break;
                    case "delete":
                        _StdOut.putText("Deletes a file from memory... ex; delete doge");
                        _StdOut.advanceLine();
                        break;
                    case "ls":
                        _StdOut.putText("lists the files in the directory");
                        _StdOut.advanceLine();
                        break;
                    case "setschedule":
                        _StdOut.putText("Sets the schedule of the CPU algorithm; ex setschedule <fcfs/rr/priority>");
                        _StdOut.advanceLine();
                        break;
                    case "getschedule":
                        _StdOut.putText("Returns the algorithm that the CPU is using.");
                        _StdOut.advanceLine();
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        };
        Shell.prototype.shellTrace = function (args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        };
        Shell.prototype.shellBSOD = function (args) {
            // the all mighty blue screen of life...err...death
            _StdOut.bsod();
            _StdOut.resetXY();
            _Kernel.krnShutdown();
            var BSOD_jingle = document.getElementById("BSOD_jingle");
            var BSOD_image = document.getElementById("BSOD_image");
            BSOD_jingle.play();
            var c = document.getElementById("display");
            var ctx = c.getContext("2d");
            ctx.drawImage(BSOD_image, 0, 0);
        };
        Shell.prototype.shellMusic = function (args) {
            var music = document.getElementById("music");
            music.play();
            _StdOut.putText("Playing music from:");
            _StdOut.advanceLine();
            _StdOut.putText("https://www.youtube.com/watch?v=cA9g-YjfGxo");
            _StdOut.advanceLine();
        };
        Shell.prototype.shellLoad = function (args) {
            var program = document.getElementById('taProgramInput').value; //bring in value from html5 input
            program = program.replace(/(\r\n|\n|\r)/gm, "");
            program = TSOS.Utils.trim(program); // remove white
            var isStillValidHex = true; // set false if any aprt is not hex
            var programArray = program.split(' ');
            if (program.length == 0) {
                isStillValidHex = false;
            } //disable if nothing there
            for (var i = 0; i < programArray.length; i++) {
                if (TSOS.Utils.checkForValidHex(programArray[i])) {
                    isStillValidHex = true;
                }
                else {
                    isStillValidHex = false;
                }
            }
            if (isStillValidHex) {
                //_StdOut.putText("Congradulations...thats valid hex code!... lets do something with it!");
                var programString = '';
                for (var i = 0; i < programArray.length; i++) {
                    programString += programArray[i];
                }
                var chars = programString.split('');
                var doubles = [];
                for (var i = 0; i < chars.length; i += 2) {
                    doubles.push(chars[i] + chars[i + 1]);
                }
                var prio = 5;
                if (args.length > 0) {
                    prio = args[0];
                }
                var num = _ProcessManager.load(doubles, prio); //push em in and hope for the best
                if (num != -1) {
                    _StdOut.putText("We got a PID for ya: " + num);
                }
                else {
                    _StdOut.advanceLine();
                    _StdOut.putText("Sorry... I couldn't load that :(");
                }
            }
            else {
                _StdOut.putText("Invalid Hex Code: ");
                _StdOut.putText(program);
            }
        };
        Shell.prototype.shellRun = function (args) {
            if (args.length > 0) {
                for (var i = 0; i < args.length; i++) {
                    _StdOut.putText("Attempting to run PID: " + args[i]);
                    _StdOut.advanceLine();
                    _ProcessManager.runPiD(args[i]);
                }
            }
            else {
                _StdOut.putText("No arguements provided (do you actually want to run something or just waste my time?)");
            }
        };
        Shell.prototype.shellRunAll = function (args) {
            var allgood = _ProcessManager.runall();
            if (!allgood) {
                _StdOut.putText("No Processes Loaded!");
            }
        };
        Shell.prototype.shellClearMemory = function (args) {
            _MemoryManager.clearAllMemory();
            _StdOut.putText("Memory has been cleared!");
        };
        Shell.prototype.shellKillAll = function (args) {
            // nothing here yet
        };
        Shell.prototype.shellKill = function (args) {
            if (args.length > 0) {
                // invoke the killbot!
                var pidToKill = parseInt(args[0]);
                if (_ProcessManager.checkIfExists(pidToKill)) {
                    _StdOut.putText("Killing PiD: " + pidToKill);
                    _ProcessManager.kill(pidToKill);
                }
                else {
                    _StdOut.putText("PiD " + pidToKill + " Doesnt Exist");
                }
            }
            else {
                _StdOut.putText("Usage: kill <pid> - You must tell me what to kill!");
            }
        };
        Shell.prototype.shellFormat = function (args) {
            _krnFileSystemDriver.consoleISR("format", "");
            _StdOut.putText("Format Memory Sucessful");
        };
        Shell.prototype.shellCreate = function (args) {
            if (args.length > 0) {
                _krnFileSystemDriver.consoleISR("create", args[0]);
            }
            else {
                _StdOut.putText("Usage: create <filename>");
            }
        };
        Shell.prototype.shellRead = function (args) {
            //TODO
        };
        Shell.prototype.shellWrite = function (args) {
            if (args.length > 1) {
                var parcount = 0;
                var data = "";
                for (var i = 1; i < args.length; i++) {
                    for (var j = 0; j < args[i].length; j++) {
                        if (args[i].charAt(j) === '"') {
                            parcount++;
                        }
                        else {
                            data += args[i].charAt(j);
                        }
                    }
                }
                if (parcount === 2) {
                    _krnFileSystemDriver.consoleISR("write", args[0], data);
                }
                else {
                    _StdOut.putText('PLEASE REMEMBER QUOTATIONS AROUND YOUR DATA!!! Usage: write <filename> "<data>"');
                }
            }
            else {
                _StdOut.putText("Usage: write <filename> <data>");
            }
        };
        Shell.prototype.shellDelete = function (args) {
            //TODO
        };
        Shell.prototype.shellls = function (args) {
            _krnFileSystemDriver.consoleISR("ls");
        };
        Shell.prototype.shellSetSchedule = function (args) {
            if (args.length > 0) {
                if (args[0] == "fcfs") {
                    _CPUScheduler.QuantiumSet(9999999999); // basically fcfs
                    _CPUScheduler.schedulingModeSet("fcfs");
                    _StdOut.putText("Scheduling Mode Set to: First Come First Serve");
                    TSOS.Control.CPUModeSet("FCFS");
                }
                else if (args[0] == "priority") {
                    _CPUScheduler.schedulingModeSet("priority");
                    _StdOut.putText("Scheduling Mode Set to: Non-Preemptive	Priority");
                    TSOS.Control.CPUModeSet("Non-Preemptive	Priority");
                }
                else if (args[0] == "rr") {
                    _CPUScheduler.QuantiumSet(6);
                    _CPUScheduler.schedulingModeSet("ROUND_ROBIN");
                    _StdOut.putText("Scheduling Mode Set to: Round Robin");
                    TSOS.Control.CPUModeSet("Round Robin");
                }
                else {
                    _StdOut.putText("Waa?... I didnt understand what you want");
                }
            }
            else {
                _StdOut.putText("Usage: setschedule <fcfs/rr/priority>");
            }
        };
        Shell.prototype.shellGetSchedule = function (args) {
            _StdOut.putText("The Current Scheduling Algorithm is: " + _CPUScheduler.schedulingType);
        };
        Shell.prototype.shellPS = function (args) {
            // nothing here yet
            _StdOut.putText("Active PiD's: " + _ProcessManager.getRunning());
        };
        Shell.prototype.shellQuantium = function (args) {
            if (args.length > 0) {
                // invoke the quantium!
                _CPUScheduler.QuantiumSet(parseInt(args[0]));
                _StdOut.putText("Quantum set to " + parseInt(args[0]));
            }
            else {
                _StdOut.putText("Usage: quantum <number> - You must tell me what you want to set the quantum to!");
            }
        };
        Shell.prototype.shellDoge = function (args) {
            if (_IsDogeRunning === false) {
                _DogeData = new Doge([
                    'wow',
                    'much commands',
                    'such os',
                    'very pretty',
                    'much retro',
                    'many speed',
                    'such cli',
                    'typescript skillz',
                    'only 1 semester OS course'
                ]);
                _IsDogeRunning = true;
                _StdOut.putText("Doge has been activated!");
            }
            else {
                _DogeData.stop();
                _IsDogeRunning = false;
                _StdOut.putText("Doge has been stopped!");
            }
        };
        Shell.prototype.shellRot13 = function (args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellPrompt = function (args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        };
        return Shell;
    }());
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
