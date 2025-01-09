import { Route } from '@angular/router';


export const loginRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./login.page').then(m => m.LoginPageComponent),
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        loadComponent: () => import('./components/sign-in/sign-in.component').then(m => m.SignInComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./components/sign-up/sign-up.component').then(m => m.SignUpComponent),
      },
      {
        path: 'welcome',
        loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent),
        // canActivate: [AliveSessionGuard],
      },
    ],
  },
];
