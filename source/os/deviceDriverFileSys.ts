///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />


module TSOS {
    export class DeviceDriverFileSys extends DeviceDriver {

        constructor (){
            super(this.krnFSDriverEntry, this.consoleISR);
        }

        public krnFSDriverEntry() {
            //this is what loads the driver
        }
        
		public consoleISR(parameter: string, data: string) {
			if(parameter = "format"){ // User asked for format the driver
				_FileSystemManager.formatFileSystem();
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