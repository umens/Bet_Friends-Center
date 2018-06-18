import { StatusCompetition } from './match-day';
import { Group } from './group';
import { League } from './league';

export class Season {

  id: String;
  label: String;
  year: Number;
  status: StatusCompetition;
  apiRef: Number;
  currentMatchDay: Number;
  groups: Group[];
  league: League | String;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
