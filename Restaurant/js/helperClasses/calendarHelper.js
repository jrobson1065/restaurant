export class Calendar {
  checkHours(day, hour) {
    switch (day) {
      case 0:
        console.log("We are not open Sunday");
        return false;
      case 5:
      case 6:
        break;
      default:
        break;
    }
  }
}
