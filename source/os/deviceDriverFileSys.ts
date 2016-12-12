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
        
		public consoleISR(parameter: string, data: string, data1: string) {
			if(parameter = "format"){ // User asked for format the driver
				_FileSystemManager.format();
				TSOS.Control.fileSystemUpdate();
			}else if(parameter = "ls"){
				_FileSystemManager.ls(data);
			}else if(parameter = "create"){
				_FileSystemManager.create(data);
			}else if(parameter = "read"){
				_FileSystemManager.read(data);
			}else if(parameter = "write"){
				_FileSystemManager.write(data, data1);
			}else if(parameter = "delete"){
				_FileSystemManager.deleteFile(data);
			}else{
				//idk what to do
			}
        }
    }
}