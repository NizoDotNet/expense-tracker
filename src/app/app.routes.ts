import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Transactions } from './pages/transactions/transactions';
export const routes: Routes = [
  {
    path: 'transactions',
    component: Transactions,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then((c) => c.Reports),
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },
];
