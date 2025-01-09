import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationBucketComponent, NotificationBucketProvider } from '@front-lib';
import { SessionProvider } from 'login/providers/session.provider';
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MainLayoutComponent,
    NotificationBucketComponent,
  ],
  providers: [
    NotificationBucketProvider,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'food-app-monorepo';

  constructor(
    private sessionProvider: SessionProvider,
    private notificationProvider: NotificationBucketProvider,
  ) {

  }
  ngOnInit(): void {
    this.notificationProvider.addNotification({
      message: 'Hello, success app component!',
      type: 'success',
      permanent: true

    });

    this.notificationProvider.addNotification({
      message: 'Hello, info!',
      type: 'info',
      permanent: true

    });
    this.notificationProvider.addNotification({
      message: 'Hello, warning!',
      type: 'warning',
      permanent: true

    });
    this.notificationProvider.addNotification({
      message: 'Hello, error!',
      type: 'error',
      permanent: true
    });
  }
}
