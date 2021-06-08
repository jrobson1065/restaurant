export class TableHelper {
  constructor(restaurant) {
    this.restaurant = restaurant;
    this.maxPartySize = restaurant.getMaxPartySize();
  }
}
