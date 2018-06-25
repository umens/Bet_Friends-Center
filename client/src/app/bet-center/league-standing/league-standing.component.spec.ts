import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueStandingComponent } from './league-standing.component';

describe('LeagueTableComponent', () => {
  let component: LeagueStandingComponent;
  let fixture: ComponentFixture<LeagueStandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueStandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueStandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
