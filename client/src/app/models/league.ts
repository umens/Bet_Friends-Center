import { Season } from './season';

export class League {

  id: String;
  label: String;
  code: String;
  haveGroup: Boolean;
  seasons: Season[] | Number[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
