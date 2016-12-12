///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />


module TSOS {
    export class DeviceDriverFileSys extends DeviceDriver {

        constructor (){
            super(this.krnFSDriverEntry, this.consoleISR);
        }

        public krnFSDriverEntry() {
            // Initialization routine for this, the kernel-mode File System Device Driver.
            this.status = "loaded";
            // More?
        }
        
		public consoleISR(parameter: string, data: string) {
			if(parameter = "format"){ // User asked for format the driver
				_FileSystemManager.format();
				TSOS.Control.fileSystemUpdate();
			}else if(parameter = "ls"){
				_FileSystemManager.listDirectory();
			}else if(parameter = "create"){
				//TODO
			}else if(parameter = "read"){
				//TODO
			}else if(parameter = "write"){
				//TODO
			}else if(parameter = "delete"){
				//TODO
			}else{
				//idk what to do
			}
        }
    }
}