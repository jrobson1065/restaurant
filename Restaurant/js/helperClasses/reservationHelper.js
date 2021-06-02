class Reservation {
  static #existingReservations = [];

  #makeDate(day, hour) {
    today = new Date();

    res = new Date(today.getFullYear(), today.getMonth(), day, hour, 0, 0);

    if (today.getDate() > res.getDate()) {
      if (today.getMonth() === 11)
        res.setFullYear(today.getFullYear() + 1, today.getMonth() + 1);
      else res.setMonth(today.getMonth() + 1);
    }

    return res;
  }

  checkAvailability = (date, size = 0) => {
    let seatsTaken = 0;

    Reservation.#existingReservations
      .filter((r) => r.date === date)
      .forEach((r) => (seatsTaken += r.size));

    return size ? size + seatsTaken <= 20 : seatsTaken < 20;
  };

  constructor(name, { date, size }) {
    this.name = name;
    console.log(
      `Thank you ${name} for starting a reservation, please enter the day of the month and the time you wish to set your reservation for.`
    );
    this.date = date;
    this.size = size;
  }

  setDate(day, hour) {
    if (calendar.checkHours(day, hour)) {
      if (this.checkAvailability(this.#makeDate(day, hour))) {
        console.log(`We still have seats available at `);
        this.date = this.#makeDate(day, hour);
      }
    }
  }

  setSize(size) {
    this.size = size;
  }

  build() {
    Reservation.#existingReservations.push({ date, size, instance: this });

    console.log(
      `Thank you ${this.name}, your reservation is set for ${this.date} for ${this.size} people`
    );
  }
}
