import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Notification, NotificationPayload, NotificationType } from '../interfaces/notification-bucket.interfaces';

@Injectable(
  { providedIn: 'root' }
)
export class NotificationBucketProvider {
  private _notifications: NotificationPayload[] = [];
  private _notificationsSubject = new Subject<NotificationPayload[]>();
  private _incomingNotificationSubject = new Subject<Notification>();
  private _incomingNotificationSubjectForPropagation =
    new BehaviorSubject<NotificationPayload>({} as NotificationPayload);

  constructor() {
    console.log('NotificationBucketProvider', new Date());
    this._incomingNotificationSubject.subscribe((notification) => {
      console.log('NotificationBucketProvider 1', notification);
      if (!notification.id) {
        // console.error('Notification id is required');
        return;
      }

      const newNotification: NotificationPayload = {
        id: notification.id,
        message: notification.message,
        type: notification.type,
        selfDestructionCallback: notification.permanent
          ? null : this.selfDestruct(notification.id, notification.liveSpanSec),
      }
      this._notifications.push(newNotification);

      this._incomingNotificationSubjectForPropagation.next(newNotification);
      this._notificationsSubject.next(this._notifications);
    });
  }

  public observeAllNotifications() {
    return this._notificationsSubject.asObservable();
  }

  public observeIncomingNotifications() {
    return this._incomingNotificationSubjectForPropagation.asObservable();
  }

  public addNotification(payload: {
    message: string,
    type: NotificationType,
    liveSpanSec?: number,
    permanent?: boolean,
  }) {
    const id = uuid();
    this._incomingNotificationSubject.next({
      id,
      message: payload.message,
      type: payload.type ?? 'info',
      liveSpanSec: payload.liveSpanSec,
      permanent: payload.permanent,
    });
    return id;
  }

  public getNotifications() {
    return this._notifications;
  }

  public removeNotification(id: string) {
    this._notifications = this._notifications.filter((notification) => notification.id !== id);
    this._notificationsSubject.next(this._notifications);
  }

  public getNotification(id: string) {
    return this._notifications.find((notification) => notification.id === id);
  }

  public updateNotification(id: string, message: string, type: NotificationType) {
    const notification = this.getNotification(id);
    if (notification) {
      notification.message = message;
      notification.type = type;
    }
  }

  public dismissAll() {
    this._notifications = [];
    this._notificationsSubject.next(this._notifications);
  }

  private selfDestruct(notificationId: string, timeSec = 7) {
    new Promise((resolve) => {
      setTimeout(() => {
        this.removeNotification(notificationId);
        console.log('Notification removed', notificationId, timeSec);
        resolve(null);
      }, timeSec * 1000);
    })
  }

}
