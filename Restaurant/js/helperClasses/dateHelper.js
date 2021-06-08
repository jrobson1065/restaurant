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
  convertMinutes = (time) => Math.round(time / 6) / 10;
  convertTime = (hours, mins) => convertHours(hours) + convertMinutes(mins);
  isBetween = (time, start, end) => time >= start && time <= end;

  convertHours = (time) => {
    time = time + "";
    let t = 0;
    if (time[time.length - 2].toLowerCase() === "p") t = 12;
    return t + +[...time].slice(0, time.length - 2).join("");
  };

  convertDate = (date) => {
    if (date instanceof Date)
      return {
        hours: date.getHours(),
        mins: date.getMinutes(),
        dow: this.convertDay(date.getDay()),
        dom: date.getDate(),
        month: this.convertMonth(date.getMonth()),
        year: date.getFullYear(),
      };
  };
}
