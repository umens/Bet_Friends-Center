import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { NotificationsService, Options as NotificationDisplayOptions } from 'angular2-notifications';

import { environment } from '../environments/environment';
import { Logger, NotificationService } from './core';
import { NotificationType, Notification } from './models';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  options: NotificationDisplayOptions = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'scale',
    position: ['bottom', 'right']
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _service: NotificationsService,
    private notificationService: NotificationService,
  ) {
    this.notificationService.notification$.subscribe((notification: Notification) => {
      this.showNotification(notification);
    });
   }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');
  }

  showNotification(notification: Notification): void {
    switch (notification.type) {
      case NotificationType.SUCCESS:
        this._service.success(notification.title, notification.content, notification.override);
        break;
      case NotificationType.ALERT:
        this._service.alert(notification.title, notification.content, notification.override);
        break;
      case NotificationType.ERROR:
        this._service.error(notification.title, notification.content, notification.override);
        break;
      case NotificationType.INFO:
        this._service.info(notification.title, notification.content, notification.override);
        break;
      case NotificationType.BARE:
        this._service.bare(notification.title, notification.content, notification.override);
        break;
      case NotificationType.WARN:
        this._service.warn(notification.title, notification.content, notification.override);
        break;
    }
  }


}
