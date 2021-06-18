export class Error {
  constructor(error) {
    this.error = error;
    this.displayError();
  }

  displayError = () => console.error(this.error);

  getId = () => this.error;
  getInfo = () => this.error;
}
