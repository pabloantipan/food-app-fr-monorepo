import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../wrapper/wrapper.component').then(m => m.WrapperComponent),
  },
  {
    path: 'welcome',
    loadComponent: () => import('../login/login.page').then(m => m.LoginPageComponent),
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.routes').then(r => r.loginRoutes),
  },
];
