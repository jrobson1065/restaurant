import { CalendarHelper } from "./helperClasses/calendarHelper.js";
import { ReservationHandler } from "./helperClasses/reservationHelper.js";
import { TableHelper } from "./helperClasses/tableHelper.js";

export class Restaurant {
  constructor(name, maxPartySize) {
    this.name = name;
    this.maxPartySize = maxPartySize;
    this.table = new TableHelper(this);
    this.calendar = new CalendarHelper(this);
    this.reservationHelper = new ReservationHandler(this);

    this.normalHours = { open: "5pm", close: "10pm" };
    this.extendedHours = { open: "5pm", close: "12am" };
    this.updateHours();
  }

  setMaxPartySize = (size) => (this.maxPartySize = size);
  getMaxPartySize = () => this.maxPartySize;

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
    this.reservationHelper.startReservation(size, name, date);
  };
}
