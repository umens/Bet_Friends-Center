export class User {
  id: number;
  firstName: string;
  lastName: string;
  picture: string;
  email: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  /**
   * Display the full name of the user
   *
   * @returns {string}
   *
   * @memberOf User
   */
  public displayFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  /**
   * return a stringify version of the User, mostly for localstorage purpose
   *
   * @returns {string}
   *
   * @memberOf User
   */
  stringify(): string {
    let preObject: any;
    preObject = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      picture: this.picture,
      email: this.email,
    };
    return JSON.stringify(preObject);
  }
}
