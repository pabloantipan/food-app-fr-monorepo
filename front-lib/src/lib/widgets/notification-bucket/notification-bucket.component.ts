import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { NotificationPayload, NotificationType } from './interfaces/notification-bucket.interfaces';
import { NotificationBucketProvider } from './providers/notification-bucket.provider';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'lib-notification-bucket',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './notification-bucket.component.html',
  styleUrl: './notification-bucket.component.scss'
})
export class NotificationBucketComponent {
  private _notifications: NotificationPayload[] = [];
  public get notifications() { return this._notifications; }
  private _notificationRenderings: { [key: string]: boolean } = {};
  private _notificationPromisesForTriggerRendering: { [key: string]: Promise<boolean> } = {};

  constructor(
    private readonly _notificationProvider: NotificationBucketProvider,
  ) {
    this._notificationProvider.observeAllNotifications()
      .subscribe({
        next: (notifications) => {
          const lastNotification = this.getLastNotification(this._notifications, notifications);
          if (lastNotification[0]) {
            this._notificationRenderings[lastNotification[0].id] = false;
            this._notificationPromisesForTriggerRendering[lastNotification[0].id] =
              new Promise((resolve) => {
                setTimeout(() => {
                  this._notificationRenderings[lastNotification[0].id] = true;
                  resolve(true);
                }, 100);
              });
          }
          this._notifications = [...notifications];
        },
        error: (error) => {
          console.error('Error in NotificationBucketComponent', error);
        },
        complete: () => {
          console.log('NotificationBucketComponent completed');
        },
      });
  }

  dismiss(id: string) {
    this._notificationProvider.removeNotification(id);
  }

  getNotificationTypeClass(type: NotificationType) {
    switch (type) {
      case 'info':
        return 'type info';
      case 'warning':
        return 'type warning';
      case 'error':
        return 'type error';
      case 'success':
        return 'type success';
      default:
        return '';
    }
  }

  public getRenderingClassCallback(id: string) {
    return this._notificationRenderings[id];
  }

  private findNotificationById(id: string) {
    return this._notifications.find((notification) => notification.id === id);
  }

  private getLastNotification(previousNotifications: NotificationPayload[], currentNotifications: NotificationPayload[]) {
    return _.differenceWith(currentNotifications, previousNotifications);
  }

}
