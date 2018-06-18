import { Component, OnInit } from '@angular/core';
import { PoolDataService } from '../services/pool-data.service';
import { NotificationService } from 'src/app/core';
import { NotificationType, Notification } from '../../models';
import { Pool } from '../../models/pool';
import { ActivatedRoute } from '@angular/router';
import { MatchDay } from '../../models/match-day';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {

  isLoading: boolean;
  pool: MatchDay;

  constructor(
    private route: ActivatedRoute,
    private poolDataService: PoolDataService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getPool();
  }

  getPool() {
    const id = this.route.snapshot.paramMap.get('id');
    this.poolDataService.getPoolMatchDay(id)
      // clone the data object, using its known Pool shape
      .subscribe((data: MatchDay) => {
        this.isLoading = false;
        this.pool = data;
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

}
