import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSource = new Subject<Notification>();
  notification$ = this.notificationSource.asObservable();

  /**
   * Tells root template to show a notifcation
   *
   * @param {Notification} notification
   *
   * @memberOf NotificationService
   */
  showNotification(notification: Notification) {
    this.notificationSource.next(notification);
  }

}
