import {
  ReservationHandler,
  Reservation,
} from "./helperClasses/reservationHelper.js";

export class Restaurant {
  constructor(name, maxPartySize, maxCapacity) {
    this.name = name;
    this.maxPartySize = maxPartySize;
    this.maxCapacity = maxCapacity;
    this.reservationHelper = new ReservationHandler(this);

    this.normalHours = { open: "5pm", close: "10pm" };
    this.extendedHours = { open: "5pm", close: "12am" };
    this.updateHours();
  }

  setMaxPartySize = (size) => (this.maxPartySize = size);
  getMaxPartySize = () => this.maxPartySize;
  setMaxCapacity = (size) => (this.maxCapacity = size);
  getMaxCapacity = () => this.maxCapacity;
  getHours = () => this.hoursOfOperation;
  getName = () => this.name;

  setNormalHours = (openTime, closeTime) => {
    if (openTime) this.normalHours.open = openTime;
    if (closeTime) this.normalHours.close = closeTime;
    this.updateHours();
  };

  setExtendedHours = (openTime, closeTime) => {
    if (openTime) this.extendedHours.open = openTime;
    if (closeTime) this.extendedHours.close = closeTime;
    this.updateHours();
  };

  updateHours = () => {
    this.hoursOfOperation = {
      mon: this.normalHours,
      tue: this.normalHours,
      wed: this.normalHours,
      thu: this.normalHours,
      fri: this.extendedHours,
      sat: this.extendedHours,
      sun: "closed",
    };
  };

  createReservation = (size, name, date) => {
    console.log("Restaurant received reservation request");
    const res = this.reservationHelper.startReservation(size, name, date);
    if (res instanceof Reservation) return res;
  };

  modifyReservation = (id, mod) => {
    console.log("Reservation modification requested");

    return this.reservationHelper.modifyReservation(id, mod);
  };

  cancelReservation = (id) => this.reservationHelper.deleteReservation(id);
  findReservation = (id) => this.reservationHelper.findReservation(id);

  modifyName = (id, name) => this.modifyReservation(id, { name });
  modifySize = (id, size) => this.modifyReservation(id, { size });
  modifyDateTime = (id, dateTime) => this.modifyReservation(id, { dateTime });
}

// Search for Res by optional parameters
// Allow customers to search for res then delete or modify said res

