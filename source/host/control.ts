///<reference path="../globals.ts" />
///<reference path="../os/canvastext.ts" />

/* ------------
     Control.ts

     Requires globals.ts.

     Routines for the hardware simulation, NOT for our client OS itself.
     These are static because we are never going to instantiate them, because they represent the hardware.
     In this manner, it's A LITTLE BIT like a hypervisor, in that the Document environment inside a browser
     is the "bare metal" (so to speak) for which we write code that hosts our client OS.
     But that analogy only goes so far, and the lines are blurred, because we are using TypeScript/JavaScript
     in both the host and client environments.

     This (and other host/simulation scripts) is the only place that we should see "web" code, such as
     DOM manipulation and event handling, and so on.  (Index.html is -- obviously -- the only place for markup.)

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */

//
// Control Services
//
module TSOS {

    export class Control {

        public static hostInit(): void {
            // This is called from index.html's onLoad event via the onDocumentLoad function pointer.

            // Get a global reference to the canvas.  TODO: Should we move this stuff into a Display Device Driver?
            _Canvas = <HTMLCanvasElement>document.getElementById('display');

            // Get a global reference to the drawing context.
            _DrawingContext = _Canvas.getContext("2d");

            // Enable the added-in canvas text functions (see canvastext.ts for provenance and details).
            CanvasTextFunctions.enable(_DrawingContext);   // Text functionality is now built in to the HTML5 canvas. But this is old-school, and fun, so we'll keep it.

            // Clear the log text box.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("taHostLog")).value="";

            // Set focus on the start button.
            // Use the TypeScript cast to HTMLInputElement
            (<HTMLInputElement> document.getElementById("btnStartOS")).focus();

            // Check for our testing and enrichment core, which
            // may be referenced here (from index.html) as function Glados().
            if (typeof Glados === "function") {
                // function Glados() is here, so instantiate Her into
                // the global (and properly capitalized) _GLaDOS variable.
                _GLaDOS = new Glados();
                _GLaDOS.init();
            }
        }

        public static hostLog(msg: string, source: string = "?"): void {
            // Note the OS CLOCK.
            var clock: number = _OSclock;

            // Note the REAL clock in milliseconds since January 1, 1970.
            var now: number = new Date().getTime();

            // Build the log string.
            var str: string = "({ clock:" + clock + ", source:" + source + ", msg:" + msg + ", now:" + now  + " })"  + "\n";

            // Update the log console.
            var taLog = <HTMLInputElement> document.getElementById("taHostLog");
            taLog.value = str + taLog.value;

            // TODO in the future: Optionally update a log database or some streaming service.
        }
		
		
		public static cpuUpdate(): void {
				
				document.getElementById("cpu.instr").textContent=_MemoryManager.readFromMemory(_CPU.currentPCB, _CPU.PC);
				document.getElementById("cpu.pc").textContent= _CPU.PC.toString();
				document.getElementById("cpu.acc").textContent= _CPU.Acc.toString();
				document.getElementById("cpu.xreg").textContent= _CPU.XReg.toString();
				document.getElementById("cpu.yreg").textContent= _CPU.YReg.toString();
				document.getElementById("cpu.zflag").textContent= _CPU.ZFlag.toString();
				//document.getElementById("cpu.isexecuting").textContent= _CPU.isExecuting.toString();
				
				this.readyQueueUpdate();
			// udpate the html pcb
		}
		
		public static readyQueueUpdate(): void {
				var output: string = "<tr style='font-size: 0.775em;padding: 0px;'><th>PID</th><th>Swap</th><th>State</th><th>PC</th><th>Acc</th><th>X</th><th>Y</th><th>Z</th><th>Base</th><th>Turn</th><th>Wait</th></tr>";
				 for(var i = 0; i < _ProcessManager.ResidentList.length; i++){
					var processcontrolblock = _ProcessManager.ResidentList[i];
					if(processcontrolblock.PS === "NEW" || processcontrolblock.PS === "READY" || processcontrolblock.PS === "WAITING" || processcontrolblock.PS === "RUNNING"){
						var inSwap = "No";
						if(processcontrolblock.IsInSwap){
							inSwap = "Yes";
						}
						output += '<tr style="font-size: 0.775em;padding: 0px;"><td>'+processcontrolblock.PID+'</td><td>'+inSwap+'</td><td>'+processcontrolblock.PS+'</td><td>'+processcontrolblock.PC+'</td><td>'+processcontrolblock.Acc+'</td><td>'+processcontrolblock.XReg+'</td><td>'+processcontrolblock.YReg+'</td><td>'+processcontrolblock.ZFlag+'</td><td>'+processcontrolblock.BaseReg+'</td><td>'+processcontrolblock.Turn+'</td><td>'+processcontrolblock.Wait+'</td></tr>';
					}
				 }
				document.getElementById('ReadyQueueTableData').innerHTML = output;
				
				// onto the terminated tab
				var output: string = '<tr style="font-size: 0.775em;padding: 0px;"><th>PID</th><th>State</th><th>PC</th><th>X</th><th>Y</th><th>Z</th><th>Base</th><th>Turn</th><th>Wait</th></tr>';
				 for(var i = 0; i < _ProcessManager.ResidentList.length; i++){
					var processcontrolblock = _ProcessManager.ResidentList[i];
					if(processcontrolblock.PS === "TERMINATED" || processcontrolblock.PS === "HALTED"){
						output += '<tr style="font-size: 0.775em;padding: 0px;"><td>'+processcontrolblock.PID+'</td><td>'+processcontrolblock.PS+'</td><td>'+processcontrolblock.PC+'</td><td>'+processcontrolblock.XReg+'</td><td>'+processcontrolblock.YReg+'</td><td>'+processcontrolblock.ZFlag+'</td><td>'+processcontrolblock.BaseReg+'</td><td>'+processcontrolblock.Turn+'</td><td>'+processcontrolblock.Wait+'</td></tr>';
					}
				 }
				document.getElementById('TerminatedSlashCompletedTableData').innerHTML = output;
		
		}
		
		
		public static memoryUpdate(): void {
				var output: string = "";
				var memoryTables = _Memory.toString().split(" ");
				var positionInRow:number = 0;
				for(var i:number=0; i<768; i+=8){
					output+= "<tr><td style='padding: 0px;'><b>0x"+i+"</b></td><td style='padding: 0px;'>"	+memoryTables[positionInRow++]+"</td><td style='padding: 0px;'>"
											+memoryTables[positionInRow++]+"</td><td style='padding: 0px;'>"
											+memoryTables[positionInRow++]+"</td><td style='padding: 0px;'>"
											+memoryTables[positionInRow++]+"</td><td style='padding: 0px;'>"
											+memoryTables[positionInRow++]+"</td><td style='padding: 0px;'>"
											+memoryTables[positionInRow++]+"</td><td style='padding: 0px;'>"
											+memoryTables[positionInRow++]+"</td><td style='padding: 0px;'>"
											+memoryTables[positionInRow++]+"</td><td style='padding: 0px;'>";
				}
				output+="</tr>";
				
				
				document.getElementById('MemoryBody').innerHTML = output;
			// udpate the html pcb
		}
		
		public static fileSystemUpdate(): void {
			var output: string = "";
			for(var i = 0; i < _FileSystem.tracks; i++){
                    for(var j = 0; j < _FileSystem.sectors; j++){
                        for(var k = 0; k < _FileSystem.blocks; k++){
							output += "<tr><td style='padding: 0px; font-size: 0.875em;'>["+i+","+j+","+k+"]</td>"; // tsb
                            var file = _FileSystem.read(i, j, k);
							output += '<td style="padding: 0px; font-size: 0.875em;">'+file.substr(0,1)+'</td>'; // bit 
                            output += '<td style="padding: 0px; font-size: 0.875em;">'+file.substr(1,3)+'</td>'; // location
							output += '<td style="padding: 0px; font-size: 0.875em;">'+file.substr(4,file.length)+'</td>'; // data
                        }
                    }
                }
			output+="</tr>";
			document.getElementById('HDDBody').innerHTML = output;
			
			
		}
		
		public static CPUModeSet(mode: string): void {
			document.getElementById('SchedulingMode').innerHTML = mode;
		}
		
		public static singleCPUStepMode(){
			if(_CPU.singleStepMode){
				_CPU.singleStepMode = false;
				_CPU.singleStepAuth = true;
				document.getElementById('btnCPUStepMode').value = "Single Step Mode [OFF]";
			}else{
				_CPU.singleStepMode = true;
				document.getElementById('btnCPUStepMode').value = "Single Step Mode [ON]";
			}
		}
		
		public static allowCPUStep(){
			_CPU.singleStepAuth = true;
		}
        //
        // Host Events
        //
        public static hostBtnStartOS_click(btn): void {
            // Disable the (passed-in) start button...
            btn.disabled = true;

            // .. enable the Halt and Reset buttons ...
            (<HTMLButtonElement>document.getElementById("btnHaltOS")).disabled = false;
            (<HTMLButtonElement>document.getElementById("btnReset")).disabled = false;
			(<HTMLButtonElement>document.getElementById("btnCPUStepMode")).disabled = false;
			(<HTMLButtonElement>document.getElementById("btnSingleStepCPU")).disabled = false;

            // .. set focus on the OS console display ...
            document.getElementById("display").focus();

            // ... Create and initialize the CPU (because it's part of the hardware)  ...
            _CPU = new Cpu();  // Note: We could simulate multi-core systems by instantiating more than one instance of the CPU here.
            _CPU.init();       //       There's more to do, like dealing with scheduling and such, but this would be a start. Pretty cool.
			_Memory = new Memory(768); // start out with 768 bits!
            _Memory.init(); // initialize time!
			_FileSystem = new FileSystem(4, 8, 8, 64, 4);

            // ... then set the host clock pulse ...
            _hardwareClockID = setInterval(Devices.hostClockPulse, CPU_CLOCK_INTERVAL);
            // .. and call the OS Kernel Bootstrap routine.
            _Kernel = new Kernel();
            _Kernel.krnBootstrap();  // _GLaDOS.afterStartup() will get called in there, if configured.
        }

        public static hostBtnHaltOS_click(btn): void {
            Control.hostLog("Emergency halt", "host");
            Control.hostLog("Attempting Kernel shutdown.", "host");
            // Call the OS shutdown routine.
            _Kernel.krnShutdown();
            // Stop the interval that's simulating our clock pulse.
            clearInterval(_hardwareClockID);
            // TODO: Is there anything else we need to do here?
				// I mean there could be *shrugs*
        }

        public static hostBtnReset_click(btn): void {
            // The easiest and most thorough way to do this is to reload (not refresh) the document.
            location.reload(true);
            // That boolean parameter is the 'forceget' flag. When it is true it causes the page to always
            // be reloaded from the server. If it is false or not specified the browser may reload the
            // page from its cache, which is not what we want.
        }
    }
}
