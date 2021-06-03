class ReservationBuilder {
	constructor(id) {
		this.id = id;
	}
	
	setSize = (size) => this.size = size;
	setName = (name) => this.name = name;
	setDate = (date) => this.dateTime = date;
}

class ReservationFactory {
	id = 1;
	startReservation = () => new ReservationBuilder(this.id++);
}