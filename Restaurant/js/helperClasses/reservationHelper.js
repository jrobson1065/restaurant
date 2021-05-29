class Reservation {
  constructor(name, time, size) {
    this.name = name;
    this.time = time;
    this.size = size;
    console.log(
      `Thank you ${name}, your reservation is set for ${time} for ${size} people`
    );
  }
}

class ReservationBuilder {
  constructor(name) {
    this.name = name;
    console.log(`${name} started a reservation, please select a time`);
  }

  setTime(time) {
    this.time = time;
    console.log(`checking to see if ${time} is available`);
    console.log(`${time} is available, what size is  your party?`);
    return this;
  }

  setSize(size) {
    this.size = size;
    console.log(`Checking to see if we have room for ${size} people`);
    console.log(`We have room for ${size} people`);
    return this;
  }

  build() {
    return new Reservation(this.name, this.time, this.size);
  }
}
