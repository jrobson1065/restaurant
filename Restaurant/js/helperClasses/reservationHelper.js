import { calendar } from "./calendarHelper.js";

class Reservation {
	static #activeReservations = []
	
  constructor(name, date, size) {
    this.name = name;
    this.date = date;
    this.size = size;
    console.log(
      `Thank you ${name}, your reservation is set for ${time} for ${size} people`
    );
  }
}

export class ReservationBuilder {
  constructor(name) {
    this.name = name;
    console.log(`${name} started a reservation, please select a time`);
  }

  setTime(date) {
    console.log(`checking to see if ${date} is available`);
    if (date in calendar.monday) {
      this.time = date;
      console.log(`${date} is available, what size is  your party?`);
    } else console.log(`${date} is unavailable`);
    return this;
  }

  setSize(size) {
    this.size = size;
    console.log(`Checking to see if we have room for ${size} people`);
    console.log(`We have room for ${size} people`);
    return this;
  }

  build() {
    return new Reservation(this.name, this.date, this.size);
  }
}
