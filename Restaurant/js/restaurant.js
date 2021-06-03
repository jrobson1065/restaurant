import { Singleton } from "./helperClasses/singletonHelper.js";

class Restaurant extends Singleton {
	normalHours = {open: "5pm", close: "10pm"}
	hoursOfOperation = {
		mon: this.normalHours,
		tue: this.normalHours,
		wed: this.normalHours,
		thu: this.normalHours
	}
	
	constructor(name) {
		this.name = name
   }
};