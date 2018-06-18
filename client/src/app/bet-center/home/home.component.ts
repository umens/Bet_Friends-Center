import { Component, OnInit } from '@angular/core';
import { PoolDataService } from '../services/pool-data.service';
import { MatchDay } from '../../models/match-day';
import { NotificationService } from 'src/app/core';
import { NotificationType, Notification } from '../../models';
import { Fixture } from '../../models/fixture';
import { StatusFixture } from '../../models/fixture';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;
  pools: Array<MatchDay>;

  constructor(
    private poolDataService: PoolDataService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.isLoading = true;
    this.showCurrentMatchDay();
  }

  showCurrentMatchDay() {
    this.poolDataService.getAllCurrentBets()
      // clone the data object, using its known pool shape
      .subscribe((data: Array<MatchDay>) => {
        this.isLoading = false;
        this.pools = data;
      }, // success path
      (error) => {
        const notification: Notification = new Notification({
          title: error.title,
          content: error.message,
          type: NotificationType.ERROR
        });
        this.notificationService.showNotification(notification);
        // this.isLoading = false;
      } // error path
    );
  }

  CountCurrentGamesLeftToBet(fixtures: Fixture[]): number {
    return fixtures.filter(function(x) { return x.status !== StatusFixture.Finnished; }).length;
  }

}
