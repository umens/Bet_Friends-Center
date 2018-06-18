export class PoolSettings {

  beforeBeginning: Boolean;
  bestBetEnable: Boolean;
  victoryPoint: Number;
  correctScore: Number;
  bestBet: Number;
  errorPoint: Number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
