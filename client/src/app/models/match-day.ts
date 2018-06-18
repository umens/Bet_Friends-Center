import { PoolSettings } from './pool-settings';
import { Season } from './season';
import { Fixture } from './fixture';

export enum StatusCompetition {
  Schedulded = 'SCHEDULED',
  InProgress = 'IN_PROGRESS',
  Finnished = 'FINISHED',
}

export class MatchDay {

  id: String;
  settings: PoolSettings;
  status: StatusCompetition;
  label: String;
  season: Season;
  fixtures: Fixture[] | String[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
