export class Team {

  id: String;
  label: String;
  code: String;
  apiRef: Number;
  logo: String;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
