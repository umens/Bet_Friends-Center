import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoggerEntry } from './logger.service';

export abstract class LoggerPublisher {
  location: string;
  abstract log(record: LoggerEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

export class LoggerConsole extends LoggerPublisher {

  log(entry: LoggerEntry): Observable<boolean> {
    // Log to console
    console.log(entry.buildLogString());
    return of(true);
  }

  clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }

}

export class LoggerLocalStorage extends LoggerPublisher {

  constructor() {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = 'logging';
  }

  // Append log entry to local storage
  log(entry: LoggerEntry): Observable<boolean> {
    let ret: boolean = false;
    let values: LoggerEntry[];

    try {
      // Get previous values from local storage
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      // Add new log entry to array
      values.push(entry);
      // Store array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));

      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      console.log(ex);
    }

    return of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

export class LoggerWebApi extends LoggerPublisher {

  constructor(private http: HttpClient) {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = '/api/log';
  }

  // Add log entry to back end data store
  log(entry: LoggerEntry): Observable<boolean> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post(this.location, entry, httpOptions)
    .pipe(
      // map(response => response.json()),
      catchError(this.handleErrors)
    );
      // .pipe(map(response => response.json()))
      // .catch(this.handleErrors);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return of(true);
  }

  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let msg: string = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;
    if (error.json()) {
      msg += ' - Exception Message: ' + error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error('An error occurred', errors);

    return Observable.throw(errors);
  }
}

export class LoggerPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}

