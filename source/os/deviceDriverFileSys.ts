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
            // More?.. No
        }
        
		public consoleISR(parameter: string, data: string, data1: string) {
			if(parameter === "format"){ // User asked for format the driver
				return _FileSystemManager.format();
			}else if(parameter === "ls"){
				return _StdOut.putText(_FileSystemManager.ls());
			}else if(parameter === "create"){
				return _FileSystemManager.create(data);
			}else if(parameter === "read"){
				return _FileSystemManager.read(data);
			}else if(parameter === "write"){
				return _FileSystemManager.write(data, data1);
			}else if(parameter === "delete"){
				return _FileSystemManager.deleteFile(data);
			}else{
				//idk what else to do
				alert("halp!");
			}
        }
    }
}