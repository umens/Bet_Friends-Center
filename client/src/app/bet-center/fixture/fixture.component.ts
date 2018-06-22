import { Component, OnInit, Input } from '@angular/core';
import { Fixture, StatusFixture } from '../../models/fixture';
import { Notification } from '../../models/notification.model';
import { NotificationType } from '../../models/notification-type.enum';
import { NotificationService } from '../../core';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit {

  @Input() fixture: Fixture;

  constructor(
    private notificationService: NotificationService
  ) { }

  sanitizeUrl(logoUrl: string) {
    return logoUrl.replace(/(?=[() ])/g, '\\');
  }

  ngOnInit() {
    // if (this.fixture.apiRef === 165087) {
    //   setTimeout(() => {
    //     this.fixture.status = StatusFixture.InPlay;
    //     this.fixture.result.goalsHomeTeam = 2;
    //     this.fixture.result.goalsAwayTeam = 0;

    //     let notification: Notification = new Notification({
    //       title: 'Fixture start',
    //       content: `${this.fixture.homeTeam['label']} vs ${this.fixture.awayTeam['label']} has just started`,
    //       type: NotificationType.ALERT
    //     });
    //     this.notificationService.showNotification(notification);
    //     setTimeout(() => {
    //       notification = new Notification({
    //         title: 'Score evolution',
    //         content: `${this.fixture.homeTeam['label']} just scored<br/>
    //           1 - ${this.fixture.result.goalsAwayTeam}`,
    //         type: NotificationType.INFO
    //       });
    //       this.notificationService.showNotification(notification);
    //       setTimeout(() => {
    //         notification = new Notification({
    //           title: 'Score evolution',
    //           content: `${this.fixture.homeTeam['label']} just scored<br/>
    //             ${this.fixture.result.goalsHomeTeam} - ${this.fixture.result.goalsAwayTeam}`,
    //           type: NotificationType.INFO
    //         });
    //         this.notificationService.showNotification(notification);
    //       }, 2000);
    //     }, 2000);
    //   }, 5000);
    // }
  }

}
