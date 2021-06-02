export class Calendar {
  static existingReservations = [];

  checkAvailability = (date, size) => {
    let seatsTaken = 0;

    Calendar.existingReservations
      .filter((r) => r.date === date)
      .forEach((r) => (seatsTaken += r.size));

    return size + seatsTaken <= 20;
  };

  constructor() {}
}

const calendar = {
  monday: {
    1700: 0,
    1800: 0,
    1900: 0,
    2000: 0,
    2100: 0,
  },
  tuesday: {
    1700: 0,
    1800: 0,
    1900: 0,
    2000: 0,
    2100: 0,
  },
  wednesday: {
    1700: 0,
    1800: 0,
    1900: 0,
    2000: 0,
    2100: 0,
  },
  thursday: {
    1700: 0,
    1800: 0,
    1900: 0,
    2000: 0,
    2100: 0,
  },
  friday: {
    1700: 0,
    1800: 0,
    1900: 0,
    2000: 0,
    2100: 0,
    2200: 0,
    2300: 0,
  },
  saturday: {
    1700: 0,
    1800: 0,
    1900: 0,
    2000: 0,
    2100: 0,
    2200: 0,
    2300: 0,
  },
};
