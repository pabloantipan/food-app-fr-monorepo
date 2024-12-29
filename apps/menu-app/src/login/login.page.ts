import { Component } from '@angular/core';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@Component({
  standalone: true,
  imports: [
    SignInComponent,
    SignUpComponent,
    WelcomeComponent,
  ],
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent {
  constructor() { }
}
