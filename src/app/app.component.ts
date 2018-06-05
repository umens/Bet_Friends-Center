import { Component, OnInit } from '@angular/core';
import { LoggerService, LoggerLevel } from './core/logger.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    if (environment.production) {
      this.logger.enableProductionMode();
    }
  }
}
