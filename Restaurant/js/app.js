import { Restaurant } from "./restaurant.js";

const coccosPizza = new Restaurant("Coccos Pizzeria", 8, 20);

console.log(coccosPizza);

const res1 = coccosPizza.createReservation(
  8,
  "Kevin",
  new Date("December 17, 2021 22:24:00")
);

const res2 = coccosPizza.createReservation(
  8,
  "Kyle",
  new Date("December 17, 2021 22:24:00")
);

const res3 = coccosPizza.createReservation(
  4,
  "Keith",
  new Date("December 17, 2021 22:24:00")
);
// const res4 = coccosPizza.createReservation(
//   8,
//   "Kevin",
//   new Date("December 18, 2021 22:24:00")
// );

// const res5 = coccosPizza.createReservation(
//   8,
//   "Kyle",
//   new Date("December 18, 2021 22:24:00")
// );

// const res6 = coccosPizza.createReservation(
//   4,
//   "Keith",
//   new Date("December 18, 2021 22:24:00")
// );

// const res = coccosPizza.modifyDateTime(
//   3,
//   new Date("December 15, 2021 18:24:00")
// );
// console.log(res.getInfo());

coccosPizza.cancelReservation(3);

const myRes = coccosPizza.findReservation(3);
console.log(myRes.getInfo());
