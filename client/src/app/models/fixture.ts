import { Season } from './season';
import { Team } from './team';

import * as moment from 'moment';

export enum StatusFixture {
  Schedulded = 'SCHEDULED',
  Timed = 'TIMED',
  PostPoned = 'POSTPONED',
  InPlay = 'IN_PLAY',
  Canceled = 'CANCELED',
  Finnished = 'FINISHED',
}

export class Fixture {

  result: {
    goalsHomeTeam: Number,
    goalsAwayTeam: Number
  };
  status: StatusFixture;
  odds: String;
  id: String;
  date: Date;
  matchDay: Number;
  season: Season | String;
  homeTeam: Team | String;
  awayTeam: Team | String;
  apiRef: Number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    this.date = moment(this.date).toDate();
  }

}
