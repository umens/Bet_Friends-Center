import { TestBed, inject } from '@angular/core/testing';

import { LoggerPublisherService } from './logger-publisher.service';

describe('LoggerPublisherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerPublisherService]
    });
  });

  it('should be created', inject([LoggerPublisherService], (service: LoggerPublisherService) => {
    expect(service).toBeTruthy();
  }));
});
