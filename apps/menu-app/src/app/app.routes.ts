import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../wrapper/wrapper.component').then(m => m.WrapperComponent),
  },
  {
    path: 'welcome',
    loadComponent: () => import('../login/components/welcome/welcome.component').then(m => m.WelcomeComponent),
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.routes').then(r => r.loginRoutes),
  },
];
