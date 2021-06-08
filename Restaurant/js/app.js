import { Restaurant } from "./restaurant.js";

const coccosPizza = new Restaurant("Coccos Pizzeria", 8);

console.log(coccosPizza);

coccosPizza.createReservation(4, "Kevin", "Tomorrow");
