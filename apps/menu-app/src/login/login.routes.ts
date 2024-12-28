import { Route } from '@angular/router';

export const loginRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./components/sign-in/sign-in.component').then(m => m.SignInComponent),
  },
];
