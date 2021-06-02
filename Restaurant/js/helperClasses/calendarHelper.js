export class Calendar {
  checkHours(day, hour) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    switch (day) {
      case 0:
        console.log("We are not open Sunday");
        return false;
      case 5:
      case 6:
        if (hour >= 17 && hour <= 23) {
          console.log(`We are open at ${hour - 12}pm on ${days[day]}`);
          return true;
        } else {
          console.log(
            `We are not open at ${
              hour <= 12 ? hour + (hour === 12 ? "pm" : "am") : hour - 12 + "pm"
            } on ${days[day]}`
          );
          return false;
        }
      default:
        if (hour >= 17 && hour <= 21) {
          console.log(`We are open at ${hour - 12} on ${days[day]}`);
          return true;
        } else {
          console.log(
            `We are not open at ${
              hour <= 12 ? hour + (hour === 12 ? "pm" : "am") : hour - 12 + "pm"
            } on ${days[day]}`
          );
          return false;
        }
    }
  }
}
