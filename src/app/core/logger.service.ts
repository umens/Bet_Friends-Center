import { Injectable } from '@angular/core';

import { LoggerPublisher } from './logger-publishers';
import { LoggerPublisherService } from './logger-publisher.service';

export enum LoggerLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  level: LoggerLevel = LoggerLevel.All;
  logWithDate: boolean = true;
  publishers: LoggerPublisher[];

  constructor(private publisherService: LoggerPublisherService) {
    this.publishers = this.publisherService.publishers;
  }

  enableProductionMode() {
    this.level = LoggerLevel.Warn;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LoggerLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LoggerLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LoggerLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LoggerLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LoggerLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LoggerLevel.All, optionalParams);
  }

  private writeToLog(msg: string, level: LoggerLevel, params: any[]) {
    if (this.shouldLog(level)) {
      const entry: LoggerEntry = new LoggerEntry();
      entry.message = msg;
      entry.level = level;
      entry.extraInfo = params;
      entry.logWithDate = this.logWithDate;
      for (const logger of this.publishers) {
        logger.log(entry).subscribe(
          response => console.log(response)
        );
      }
    }
  }

  private shouldLog(level: LoggerLevel): boolean {
    let ret: boolean = false;
    if ((level >= this.level && level !== LoggerLevel.Off) || this.level === LoggerLevel.All) {
      ret = true;
    }
    return ret;
  }

}

export class LoggerEntry {
  // Public Properties
  entryDate: Date = new Date();
  message: string = '';
  level: LoggerLevel = LoggerLevel.Debug;
  extraInfo: any[] = [];
  logWithDate: boolean = true;

  buildLogString(): string {
    let ret: string = '';

    if (this.logWithDate) {
      ret = new Date() + ' - ';
    }
    ret += 'Type: ' + LoggerLevel[this.level];
    ret += ' - Message: ' + this.message;
    if (this.extraInfo.length) {
      ret += ' - Extra Info: '
        + this.formatParams(this.extraInfo);
    }

    return ret;
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    // Is there at least one object in the array?
    if (params.some(p => typeof p === 'object')) {
      ret = '';
      // Build comma-delimited string
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }

    return ret;
  }
}
