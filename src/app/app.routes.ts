import { Routes } from '@angular/router';


// import { Login } from './features/pages/login/login';
// import { Register } from './features/pages/register/register';
// import { ProductList } from './features/pages/products/product-list/product-list';
// import { ProductNewForm } from './features/pages/products/product-new-form/product-new-form';
// import { ProductEditForm } from './features/pages/products/product-edit-form/product-edit-form';
// import { UserList } from './features/pages/users/user-list/user-list';
// import { UserNewForm } from './features/pages/users/user-new-form/user-new-form';
// import { UserEditForm } from './features/pages/users/user-edit-form/user-edit-form';
// import { CategoryList } from './features/pages/categories/category-list/category-list';
// import { CategoryForm } from './features/pages/categories/category-form/category-form';
// import { Dashboard } from './features/pages/dashboard/dashboard';

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
    children: [
      // Todas las rutas hijas que inician con 'dashboard'
      // Rutas que implementan la carga perezosa abreviada (Lazy Loading). Requieren que la clase del componente se exporte por defecto (export default class NombreComponente)
      {
        path: 'products',
        loadComponent: () => import('./features/pages/products/product-list/product-list'),
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
      },
      {
        path: 'users',
        loadComponent: () => import('./features/pages/users/user-list/user-list'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/pages/categories/category-list/category-list'),
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
      },
      {
        path: 'product/new',
        loadComponent: () => import('./features/pages/products/product-new-form/product-new-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'product/edit/:id',
        loadComponent: () => import('./features/pages/products/product-edit-form/product-edit-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'users/new',
        loadComponent: () => import('./features/pages/users/user-new-form/user-new-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'users/edit',
        loadComponent: () => import('./features/pages/users/user-edit-form/user-edit-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'categories/new',
        loadComponent: () => import('./features/pages/categories/category-form/category-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
      },
      {
        path: 'categories/edit/:id',
        loadComponent: () => import('./features/pages/categories/category-form/category-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
      },
    ]
  },

  // Redirecciones (Siempre al final)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
