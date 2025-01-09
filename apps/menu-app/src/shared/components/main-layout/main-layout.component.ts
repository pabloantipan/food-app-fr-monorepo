import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideMenuButtonComponent } from '@components/side-menu-button/side-menu-button.component';
import { NotificationBucketProvider } from '@front-lib';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    SideMenuComponent,
    SideMenuButtonComponent,
    // NotificationBucketComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  constructor(
    private notificationProvider: NotificationBucketProvider,
  ) { }
}
