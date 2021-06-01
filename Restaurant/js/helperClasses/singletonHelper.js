class Singleton {
  static #instance;

  constructor() {
    if (!Singleton.#instance) Singleton.#instance = this;
    return Singleton.#instance;
  }
}

class Restaurant extends Singleton {
  timeslots = ["5", "5:30", "6", "6:30", "7", "7:30"];
  maxAvail = 20;
  currentCust = 0;

  makeReservation = (size, time) => {
    if (this.timeslots.includes(time)) {
      console.log(`Reservation made for ${size} people at ${time}pm`);
      this.timeslots = this.timeslots.filter((t) => t != time);
    } else console.log("Cannot make reservation at selected time");
  };
};
