import { Team } from './team';

export class GroupTeam {

  team: Team;
  rank: number;
  points: number;
  goals: number;
  goalsAgainst: number;
  playedGames: number;
  previousRank: number;

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
