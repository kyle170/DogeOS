module TSOS {
    export class DeviceDriverFileSys extends DeviceDriver {

        constructor (){
            super(this.krnFSDriverEntry, this.krnFS);
        }

        public krnFSDriverEntry() {
            //this is what loads the driver
        }
        
		public krnFS() {
        }
    }
}