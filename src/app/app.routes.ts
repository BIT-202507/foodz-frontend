import { Routes } from '@angular/router';

import { Home } from './features/pages/home/home';         // Eliminamos lazy loading para Home
import { PageNotFound } from './features/pages/page-not-found/page-not-found'; // Eliminamos lazy loading para 404

import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';
import { roleGuard } from './core/guards/role-guard';


export const routes: Routes = [

  {
    path: '',
    children: [
      // Rutas que cargan de forma estática
      {
        path: 'home',
        component: Home,
      },
      {
        path: '404',
        component: PageNotFound
      },
      {
        path: '',
        canActivate: [publicGuard],
        children: [
          // Rutas que implementan la carga perezosa (Lazy Loading)
          {
            path: 'login',
            loadComponent: () => import('./features/pages/login/login').then(m => m.Login),
          },
          {
            path: 'register',
            loadComponent: () => import('./features/pages/register/register').then(m => m.Register),
          },
        ]
      },
    ]
  },

  // Agrupa todas las rutas permisionadas
  {
    // NOTA: /dashboard es la ruta donde debe llegar cualquier usuario autenticado
    path: 'dashboard',
    loadComponent: () => import('./features/pages/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard],
    // OBLIGATORIO: Toda ruta hija requiere que su componente padre tenga un <router-outlet> donde desplegar sus componentes hijos
    loadChildren: () => import('./features/pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },

  // Redirecciones (Siempre al final)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
