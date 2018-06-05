import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { LoggerPublisher, LoggerConsole, LoggerLocalStorage, LoggerWebApi, LoggerPublisherConfig } from './logger-publishers';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerPublisherService {

  // Public properties
  publishers: LoggerPublisher[] = [];

  constructor(private http: HttpClient) {
    // Build publishers arrays
    this.buildPublishers();
  }

  // Build publishers array
  buildPublishers(): void {
    let loggerPub: LoggerPublisher;

    for (const pub of environment.loggers.filter(p => p.isActive)) {
      switch (pub.loggerName.toLowerCase()) {
        case 'console':
          loggerPub = new LoggerConsole();
          break;
        case 'localstorage':
          loggerPub = new LoggerLocalStorage();
          break;
        case 'webapi':
          loggerPub = new LoggerWebApi(this.http);
          break;
      }
      // Set location of logging
      loggerPub.location = pub.loggerLocation;
      // Add publisher to array
      this.publishers.push(loggerPub);
    }
  }
}
