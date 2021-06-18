import { Error } from "./errorHelper.js";

export class TableHelper {
  constructor(restaurant, database) {
    this.restaurant = restaurant;
    this.database = database;
  }

  checkCapacity = (customerInfo) => {
    console.log("Checking table size");
    if (
      customerInfo.size > 0 &&
      customerInfo.size <= this.restaurant.getMaxPartySize()
    )
      return this.checkAvailability(customerInfo);

    if (customerInfo.size < 1) new TableError("Party size must be at least 1");
    else new TableError("Party size exceeds max table size");
  };

  checkAvailability = (info) => {
    console.log("Checking availability");
    let availability = this.restaurant.getMaxCapacity();
    availability -= this.checkSeatsTaken(info.dateTime);

    const size = info.sizeDiff ? info.sizeDiff : info.size;

    if (size <= availability) return true;
    new TableError(
      "We cannot accommodate your party please un-invite some people"
    );
  };

  checkSeatsTaken = (dateTime) => {
    const res = this.database.getReservationsByTime(dateTime);
    console.log("Counting current reservations");

    return res.map((r) => r.size).reduce((a, b) => a + b, 0);
  };
}

class TableError extends Error {
  constructor(error) {
    super(error);
  }
}
