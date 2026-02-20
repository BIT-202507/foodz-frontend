import { Routes } from '@angular/router';


import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { PageNotFound } from './features/pages/page-not-found/page-not-found';
import { ProductList } from './features/pages/products/product-list/product-list';
import { ProductNewForm } from './features/pages/products/product-new-form/product-new-form';
import { ProductEditForm } from './features/pages/products/product-edit-form/product-edit-form';
import { UserList } from './features/pages/users/user-list/user-list';
import { UserNewForm } from './features/pages/users/user-new-form/user-new-form';
import { UserEditForm } from './features/pages/users/user-edit-form/user-edit-form';
import { CategoryList } from './features/pages/categories/category-list/category-list';
import { CategoryForm } from './features/pages/categories/category-form/category-form';
import { Dashboard } from './features/pages/dashboard/dashboard';

import { authGuard } from './core/guards/auth-guard';
import { publicGuard } from './core/guards/public-guard';
import { roleGuard } from './core/guards/role-guard';


export const routes: Routes = [
  {
    path: 'home',
    component: Home
    // loadComponent: () => import( './features/pages/home/home' ).then( ( m ) => m.Home )   // LazyLoad (Carga perezosa): del Componente => Version larga, el then resuelve la promesa
  },
  {
    path: 'login',
    component: Login,
    // loadComponent: () => import( './features/pages/login/login' ),     // LazyLoad (Carga perezosa): del Componente => Version corta, se agrega defaul a la exportacion de la clase del componente
    canActivate: [publicGuard]
  },
  {
    path: 'register',
    component: Register,
    canActivate: [publicGuard]
  },
  {
    path: '404',
    component: PageNotFound
  },

  // Agrupa todas las rutas permisionadas
  {
    // NOTA: /dashboard es la ruta donde debe llegar cualquier usuario autenticado
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    // OBLIGATORIO: Toda ruta hija requiere que su componente padre tenga un <router-outlet> donde desplegar sus componentes hijos
    children: [
      // Todas las rutas hijas que inician con 'dashboard'
      {
        path: 'products',
        component: ProductList,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
      },
      {
        path: 'users',
        component: UserList,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'categories',
        component: CategoryList,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
      },
      {
        path: 'product/new',
        component: ProductNewForm,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'product/edit/:id',
        component: ProductEditForm,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'users/new',
        component: UserNewForm,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'users/edit',
        component: UserEditForm,
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'categories/new',
        component: CategoryForm,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
      },
      {
        path: 'categories/edit/:id',
        component: CategoryForm,
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
      },
    ]
  },

  // Redirecciones (Siempre al final)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
