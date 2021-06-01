export class Table {
	static #currentlySeated = [];
	
  constructor(number) {
    
  }
	maxSize = 8
	
  setSize(size) {
    if (size > this.maxSize)
      console.log("Our tables only sit 8, please adjust your reservation");
    this.size = size;
  }
}
