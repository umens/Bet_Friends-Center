export class User {

  firstname: string;
  lastname: string;
  picture: string;
  email: string;
  scope: string;
  token: string;

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
    return this.firstname + ' ' + this.lastname;
  }

  /**
   * return a stringify version of the User, mostly for localstorage purpose
   *
   * @returns {string}
   *
   * @memberOf User
   */
  public stringify(): string {
    let preObject: any;
    preObject = {
      firstName: this.firstname,
      lastName: this.lastname,
      picture: this.picture,
      email: this.email,
      scope: this.scope,
      token: this.token,
    };
    return JSON.stringify(preObject);
  }
}
