import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MainLayoutComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'food-app-monorepo';
}
