import { Singleton } from "./singletonHelper.js";

class ReservationBuilder {
  size;
  name;
  dateTime;

  constructor(id, restaurant) {
    this.id = id;
    this.restaurant = restaurant;
    console.log("Builder created for reservation request");
  }

  setSize = (size) => {
    this.size = size;
    console.log("Set size for reservation request");
  };

  setName = (name) => {
    this.name = name;
    console.log("Set name for reservation request");
  };

  setDate = (date) => {
    this.dateTime = date;
    console.log("Set date for reservation request");
  };

  ready = () => {
    console.log("Reservation is ready");

    return Object.keys(this).every((key) => key !== undefined);
  };

  confirmReservation = () => {
    if (this.ready()) {
      console.log("Reservation confirmed");

      return new Reservation(
        this.restaurant,
        this.id,
        this.size,
        this.name,
        this.dateTime
      );
    }
    new ReservationError("Reservation does not meet requirements");
    return this;
  };
}

class Reservation {
  constructor(restaurant, id, size, name, dateTime) {
    this.restaurant = restaurant;
    this.id = id;
    this.size = size;
    this.name = name;
    this.dateTime = dateTime;
  }
}

class ReservationFactory {
  id = 1;

  constructor(restaurant) {
    this.restaurant = restaurant;
  }

  startReservation = () => {
    console.log("Reservation request sent to factory");
    return new ReservationBuilder(this.id++, this.restaurant);
  };
}

export class ReservationHandler {
  constructor(restaurant) {
    this.restaurant = restaurant;
    this.factory = new ReservationFactory(restaurant);
    this.database = new ReservationDatabase();
  }

  startReservation = (size, name, dateTime) => {
    console.log("ReservationHandler received reservation request");
    const builder = this.factory.startReservation();
    builder.setName(name);
    builder.setSize(size);
    builder.setDate(dateTime);
    builder.confirmReservation();
  };
}

class ReservationDatabase extends Singleton {
  existingReservations = {};

  addReservation = (reservation) =>
    (existingReservations[reservation.id] = reservation);

  removeReservation = (id) => delete existingReservations[id];
}

class ReservationError {
  constructor(error) {
    this.error = error;
    displayError();
  }

  displayError = () => console.error(this.error);
}
