import { BetCenterModule } from './bet-center.module';

describe('BetCenterModule', () => {
  let betCenterModule: BetCenterModule;

  beforeEach(() => {
    betCenterModule = new BetCenterModule();
  });

  it('should create an instance', () => {
    expect(betCenterModule).toBeTruthy();
  });
});
