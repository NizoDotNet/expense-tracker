import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'auth/login',
    component: Login,
  },
];
