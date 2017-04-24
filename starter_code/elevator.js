class Elevator {
    constructor(){
      this.floor      = 0;
      this.MAXFLOOR   = 10;
      this.passengers = [];
      this.waitingList = [];
      this.direction  = "Stand-By";
      this.intervalID = null;
    }

    start() {
        this.direction = "";
        this.intervalID = setInterval(() => this.update(), 1000);
    }

    stop() {
        clearInterval(this.intervalID);
    }

    update() {
        let tempArr;

        tempArr = this.waitingList.filter(e => e.originFloor==this.floor);

        if (tempArr.length > 0) {
            tempArr.forEach(e => console.log(`${e.name} has entered in the elevator`));
            this._passengersEnter();
        }

        tempArr = this.passengers.filter(e => e.destinationFloor == this.floor);

        if (tempArr.length > 0){
            tempArr.forEach(e => console.log(`${e.name} has left the elevator`));
            this._passengersLeave();
        }

        if (this.waitingList.length == 0 && this.passengers == 0) {
            this.direction = "Stand-By";
            this.stop();
        }
        else if (this.direction == "Up")
            this.floorUp();
        else
            this.floorDown();

        this.log();
    }

    _passengersEnter() {
        this.passengers = this.passengers.concat(this.waitingList.filter(e => e.originFloor == this.floor));
        this.waitingList = this.waitingList.filter(e => e.originFloor != this.floor );
    }

    _passengersLeave() {
        this.passengers = this.passengers.filter(e => e.destinationFloor != this.floor);
    }

    floorUp() {
        if (this.floor < this.MAXFLOOR)
            this.floor++;
        else if (this.passengers.length > 0 || this.waitingList.length > 0)
            this.direction = "Down";
    }

    floorDown() {
        if (this.floor > 0)
            this.floor--;
        else if (this.passengers.length > 0 || this.waitingList.length > 0)
            this.direction = "Up";
    }

    call(objPerson) {
        this.waitingList.push(objPerson);
        if (this.direction == "Stand-By"){
            this.start();
        }
    }

    log() {
      console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
    }
}

module.exports = Elevator;
