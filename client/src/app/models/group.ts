import { Team } from './team';

export class GroupTeam {

  team: Team;
  rank: Number;
  points: Number;
  goals: Number;
  goalsAgainst: Number;
  playedGames: Number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}

export class Group {

  id: String;
  label: String;
  teams: GroupTeam[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
