import { CalendarHelper } from "./calendarHelper.js";
import { Error } from "./errorHelper.js";
import { TableHelper } from "./tableHelper.js";

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
    console.log("Checking to see if reservation is ready");

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

export class Reservation {
  constructor(restaurant, id, size, name, dateTime) {
    this.restaurant = restaurant;
    this.id = id;
    this.size = size;
    this.name = name;
    this.dateTime = dateTime;
  }

  getId = () => this.id;
  getInfo = () =>
    `Reservation for ${this.name} party of ${this.size} on ${
      this.dateTime.asString
    } at ${this.restaurant.getName()}`;
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
  customerInfo = {};

  constructor(restaurant) {
    this.restaurant = restaurant;
    this.factory = new ReservationFactory(restaurant);
    this.database = new DatabaseHelper();
    this.calendar = new CalendarHelper(this.restaurant);
    this.tableHelper = new TableHelper(this.restaurant, this.database);
  }

  startReservation = (size, name, dateTime) => {
    console.log("ReservationHandler received reservation request");
    this.builder = this.factory.startReservation();
    this.setCustomerInfo(size, name, dateTime);
    return this.step1();
  };

  setCustomerInfo = (size, name, dateTime) => {
    this.customerInfo = {
      size,
      name,
      dateTime,
    };
  };

  step1 = () => {
    if (this.customerInfo.name) this.builder.setName(this.customerInfo.name);
    else return new ReservationError("Invalid name entered");
    return this.step2();
  };

  step2 = () => {
    const date = this.calendar.checkDateTime(this.customerInfo.dateTime);
    if (date) {
      this.builder.setDate(date);
      this.customerInfo.dateTime = date;
      return this.step3();
    } else return new ReservationError("Could not set date");
  };

  step3 = () => {
    const check = this.tableHelper.checkCapacity(this.customerInfo);
    if (check) {
      this.builder.setSize(this.customerInfo.size);
      return this.step4();
    } else return new ReservationError("Could not find table");
  };

  step4 = () => {
    const res = this.builder.confirmReservation();
    this.database.addReservation(res);
    return res;
  };

  modifyReservation = (id, mod) => {
    let check = true,
      customerInfo = {};
    const res = this.database.getReservation(id);

    if (mod.dateTime) {
      mod.dateTime = this.calendar.checkDateTime(mod.dateTime);
      if (!mod.dateTime)
        return new ReservationError(
          "Cannot modify reservation to that date and time"
        );
      customerInfo = {
        size: res.size,
        dateTime: mod.dateTime,
      };
    }

    if (mod.size) {
      customerInfo = {
        size: mod.size,
        dateTime: res.dateTime,
        sizeDiff: mod.size - res.size,
      };
    }
    check = this.tableHelper.checkCapacity(customerInfo);

    if (check) return this.database.modifyReservation(id, mod);
    else return new ReservationError("Cannot complete modification request");
  };

  deleteReservation = (id) => this.database.removeReservation(id);

  findReservation = (id) => this.database.getReservation(id);
}

class ReservationDatabase {
  existingReservations = {};

  addReservation = (reservation) => {
    this.existingReservations[reservation.id] = reservation;
    console.log(`Adding ${reservation.name}'s reservation to database`);
  };

  removeReservation = (id) => {
    if (!this.existingReservations[id])
      console.log(`Couldn't find id#${id} in database`);
    else console.log(`Deleting reservation ${id} from database`);
    delete this.existingReservations[id];
  };

  getExistingReservations = () => {
    console.log("Retrieving all reservations from database");
    return this.existingReservations;
  };

  retrieveReservation = (id) => {
    console.log(`Retrieving reservation for id#${id}`);
    const res = this.existingReservations[id];
    if (res) return res;
    return new ReservationError(`Couldn't find reservation for id#${id}`);
  };

  updateReservation = (res) => {
    console.log("Updating reservation");
    this.addReservation(res);
  };
}

class DatabaseHelper {
  database = new ReservationDatabase();

  addReservation = this.database.addReservation;
  updateReservation = this.database.updateReservation;
  removeReservation = this.database.removeReservation;
  getAllReservations = this.database.getExistingReservations;
  getReservation = this.database.retrieveReservation;

  getReservationsByTime = (dateTime) => {
    const arr = [],
      res = this.getAllReservations();

    for (let r in res) {
      r = res[r];
      if (r.dateTime.date === dateTime.date)
        if (
          r.dateTime.time > dateTime.time - 1 &&
          r.dateTime.time < dateTime.time + 1
        )
          arr.push(r);
    }

    return arr;
  };

  modifyReservation = (id, { name, dateTime, size }) => {
    const res = this.getReservation(id);

    if (name) {
      res.name = name;
      console.log("Updating name");
    }

    if (dateTime) {
      res.dateTime = dateTime;
      console.log("Updating dateTime");
    }

    if (size) {
      res.size = size;
      console.log("Updating size");
    }

    this.updateReservation(res);
    return res;
  };
}

class ReservationError extends Error {
  constructor(error) {
    super(error);
  }
}
