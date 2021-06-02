class Reservation {
  static #existingReservations = [];

  checkAvailability = (date, size) => {
    let seatsTaken = 0;

    Reservation.#existingReservations
      .filter((r) => r.date === date)
      .forEach((r) => (seatsTaken += r.size));

    return size + seatsTaken <= 20;
  };

  constructor(name, { date, size }) {
    this.name = name;
    console.log(
      `Thank you ${name} for starting a reservation, when would you like to make your reservation?`
    );
    this.date = date;
    this.size = size;
    // console.log(
    //   `Thank you ${name}, your reservation is set for ${date} for ${size} people`
    // );
    // Reservation.#existingReservations.push({ date, size, instance: this });
  }

  setDate(date) {
    console.log(`Checking to see if we are open on ${date}`);
    if (date in calendar) {
      this.date = date;
      console.log(`${date} is available, what size is  your party?`);
    } else console.log(`${date} is unavailable`);
    return this;
  }

  setSize(size) {
    console.log(`Checking to see if we have room for ${size} people.`);

    if (this.checkAvailability(this.date, size)) {
      console.log(`We have room for ${size} people.`);
      this.size = size;
      return this;
    } else
      console.log(`I'm sorry we do not have enough room for ${size} people.`);
  }
}

// export class ReservationBuilder {
//   constructor(name) {
//     this.name = name;
//     console.log(`${name} started a reservation, please select a date`);
//   }

//   setSize(size) {
//     console.log(`Checking to see if we have room for ${size} people`);

//     if (calendar.checkAvailability(this.date, size)) {
//       console.log(`We have room for ${size} people`);

//       this.size = size;

//       return this;
//     }
//   }

//   build() {
//     return new Reservation(this.name, this.date, this.size);
//   }
// }
