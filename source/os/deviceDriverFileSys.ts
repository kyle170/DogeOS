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
        
		public consoleISR() {
			if(something = "format"){ // User asked for format the driver
				_FileSystemManager.formatFileSystem();
			}else if(params.operationType = "ls"){
				_FileSystemManager.listDirectory();
			}else if(params.operationType = "create"){
				//TODO
			}else if(params.operationType = "read"){
				//TODO
			}else if(params.operationType = "write"){
				//TODO
			}else if(params.operationType = "delete"){
				//TODO
			}else{
				//idk what to do
			}
        }
    }
}