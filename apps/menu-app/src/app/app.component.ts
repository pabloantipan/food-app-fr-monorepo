import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionProvider } from 'login/providers/session.provider';
import { MainLayoutComponent } from '../shared/components/main-layout/main-layout.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MainLayoutComponent,
    // SessionProvider,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'food-app-monorepo';

  constructor(private readonly sessionProvider: SessionProvider) { }
}
