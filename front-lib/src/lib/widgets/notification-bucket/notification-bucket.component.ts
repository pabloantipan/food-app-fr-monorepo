import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { NotificationPayload, NotificationType } from './interfaces/notification-bucket.interfaces';
import { NotificationBucketProvider } from './providers/notification-bucket.provider';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-notification-bucket',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './notification-bucket.component.html',
  styleUrl: './notification-bucket.component.scss'
})
export class NotificationBucketComponent {
  notifications: NotificationPayload[] = [];

  notificationRenderings: { [key: string]: boolean } = {};
  notificationPromisesForTriggerRendering: { [key: string]: Promise<boolean> } = {};

  constructor(
    private readonly _notificationProvider: NotificationBucketProvider,
  ) {
    console.log('NotificationBucketComponent');
    this._notificationProvider.observeAllNotifications()
      .subscribe({
        next: (notifications) => {
          console.log('notifications 3', notifications);

          const lastNotification = this.getLastNotification(this.notifications, notifications);
          if (lastNotification[0]) {
            this.notificationRenderings[lastNotification[0].id] = false;
            this.notificationPromisesForTriggerRendering[lastNotification[0].id] =
              new Promise((resolve) => {
                setTimeout(() => {
                  this.notificationRenderings[lastNotification[0].id] = true;
                  resolve(true);
                }, 100);
              });
          }
          this.notifications = [...notifications];
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
    return this.notificationRenderings[id];
  }

  private findNotificationById(id: string) {
    return this.notifications.find((notification) => notification.id === id);
  }

  private getLastNotification(previousNotifications: NotificationPayload[], currentNotifications: NotificationPayload[]) {
    return _.differenceWith(currentNotifications, previousNotifications);
  }

}
