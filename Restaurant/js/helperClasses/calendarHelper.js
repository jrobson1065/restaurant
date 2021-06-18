import { DateHelper } from "./dateHelper.js";
import { Error } from "./errorHelper.js";

export class CalendarHelper {
  constructor(restaurant) {
    this.restaurant = restaurant;
    this.dateHelper = new DateHelper();
  }

  checkDateTime = (dateTime) => {
    console.log("Date time sent to calendar helper");
    const date = this.dateHelper.convertDate(dateTime);
    if (date) if (this.checkWithinYear(dateTime, date)) return date;
    new CalendarError("Could not convert date");
  };

  checkWithinYear = (dateTime, date) => {
    console.log("Checking if date is within year of today");
    const today = new Date();
    const oneYear = new Date().setFullYear(today.getFullYear() + 1);
    if (dateTime < oneYear && dateTime >= today) return this.isOpen(date);
    if (dateTime < today) new CalendarError("Date selected is in the past");
    else new CalendarError("Date selected is not within a year of today");
  };

  isOpen = (date) => {
    console.log("Checking if restaurant is open that day");
    const hours = this.restaurant.getHours();
    if (hours[date.dow] !== "closed")
      return this.duringBusinessHours(date, hours[date.dow]);
    new CalendarError("Restaurant is not open that day");
  };

  duringBusinessHours = (date, hours) => {
    console.log("Checking if reservation falls between business hours");
    const open = this.dateHelper.convertTime(hours.open);
    const close = this.dateHelper.convertTime(hours.close);
    if (this.dateHelper.isBetween(date.time, open, close - 1)) return true;
    new CalendarError("Time selected is outside of business hours");
  };
}

class CalendarError extends Error {
  constructor(error) {
    super(error);
  }
}
