import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetCenterRoutingModule } from './bet-center-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared';
import { CoreModule } from '../core';
import { FixtureComponent } from './fixture/fixture.component';
import { PoolComponent } from './pool/pool.component';
import { StandingComponent } from './standing/standing.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    BetCenterRoutingModule
  ],
  declarations: [
    HomeComponent,
    FixtureComponent,
    PoolComponent,
    StandingComponent
  ]
})
export class BetCenterModule { }
