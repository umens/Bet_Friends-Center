import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoggerService } from './logger.service';
// import { NavComponent } from './nav/nav.component';
// import { SpinnerComponent } from './spinner/spinner.component';
// import { SpinnerService } from './spinner/spinner.service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { LoggerPublisherService } from './logger-publisher.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  // exports: [NavComponent, SpinnerComponent],
  // declarations: [NavComponent, SpinnerComponent],
  // providers: [LoggerService, SpinnerService]
  providers: [
    LoggerService,
    LoggerPublisherService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
