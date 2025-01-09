import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NotificationBucketComponent,
  NotificationBucketProvider
} from '@front-lib';
import { SessionProvider } from 'login/providers/session.provider';
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MainLayoutComponent,
    NotificationBucketComponent,
    // SessionProvider,
    // NotificationBucketModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'food-app-monorepo';

  constructor(
    private sessionProvider: SessionProvider,
    private notificationProvider: NotificationBucketProvider,
  ) {
    this.notificationProvider.observeAllNotifications().subscribe((notifications) => {
      console.log('notifications 0', notifications);
    });

    this.notificationProvider.addNotification({
      message: 'Hello, success!',
      type: 'success',
      permanent: true

    });

    // this.notificationProvider.observeIncomingNotifications().subscribe((notification) => {
    //   console.log('notifications 11', notification);
    // });

    // this.notificationProvider.addNotification({
    //   message: 'Hello, info!',
    //   type: 'info',
    //   permanent: true

    // });
    // this.notificationProvider.addNotification({
    //   message: 'Hello, warning!',
    //   type: 'warning',
    //   permanent: true

    // });
    // this.notificationProvider.addNotification({
    //   message: 'Hello, error!',
    //   type: 'error',
    //   permanent: true
    // });
  }
}
