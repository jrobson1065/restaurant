import { Error } from "./errorHelper.js";

export class DateHelper {
  days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  convertDay = (num) => this.days[num];
  convertMonth = (num) => this.months[num];
  convertMinutes = (time) => Math.round(time / 30) / 2;
  convertTime = (hours, mins = 0) =>
    this.convertHours(hours) + this.convertMinutes(mins);
  isBetween = (time, start, end) => time >= start && time <= end;

  convertHours = (time) => {
    if (typeof time === "number") return time;
    let t = 0;
    if (time[time.length - 2].toLowerCase() === "p") t = 12;
    time = +[...time].slice(0, time.length - 2).join("");
    if (time >= 12) t = t === 12 ? 0 : 12;
    return t + time;
  };

  toLocalTime = (hours, mins) => {
    let period = "am";
    if (hours > 11 && hours < 24) period = "pm";
    if (hours > 12) hours -= 12;
    return `${hours}:${mins}${period}`;
  };

  convertDate = (date) => {
    if (date instanceof Date) {
      const dateObj = {
        hours: date.getHours(),
        mins: Math.round(date.getMinutes() / 30) * 30,
        time: this.convertTime(date.getHours(), date.getMinutes()),
        dow: this.convertDay(date.getDay()),
        dom: date.getDate(),
        month: this.convertMonth(date.getMonth()),
        year: date.getFullYear(),
        date: date.setHours(0, 0, 0, 0),
      };

      dateObj.localTime = this.toLocalTime(dateObj.hours, dateObj.mins);
      dateObj.asString = `${dateObj.dow}, ${dateObj.month} ${dateObj.dom}, ${dateObj.year} at ${dateObj.localTime}`;

      return dateObj;
    }
    new DateError("Invalid date");
  };
}

class DateError extends Error {
  constructor(error) {
    super(error);
  }
}
