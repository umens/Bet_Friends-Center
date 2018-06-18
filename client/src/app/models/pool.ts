import { StatusCompetition } from './match-day';
import { User } from './user.model';
import { Season } from './season';
import { PoolSettings } from './pool-settings';

export class Pool {

  id: String;
  label: String;
  status: StatusCompetition;
  commissioner: User | String;
  players: User[] | String[];
  season: Season | String;
  settings: PoolSettings;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
