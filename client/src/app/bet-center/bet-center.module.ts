import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetCenterRoutingModule } from './bet-center-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared';
import { CoreModule } from '../core';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    BetCenterRoutingModule
  ],
  declarations: [HomeComponent]
})
export class BetCenterModule { }
