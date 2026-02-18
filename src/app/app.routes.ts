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
  },
  {
    path: 'login',
    component: Login,
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
  // NOTA: /dashboard es la ruta donde debe llegar cualquier usuario autenticado
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  // NOTA: /dashboard/lo-que-sea son las rutas de usuarios autenticados con un rol establecido
  {
    path: 'dashboard/products',
    component: ProductList,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'colaborator'] }
  },
  {
    path: 'dashboard/users',
    component: UserList,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'dashboard/categories',
    component: CategoryList,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'colaborator'] }
  },
  {
    path: 'dashboard/product/new',
    component: ProductNewForm,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'colaborator'] }
  },
  {
    path: 'dashboard/product/edit/:id',
    component: ProductEditForm,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'dashboard/users/new',
    component: UserNewForm,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'dashboard/users/edit',
    component: UserEditForm,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'dashboard/categories/new',
    component: CategoryForm,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'colaborator'] }
  },
  {
    path: 'dashboard/categories/edit/:id',
    component: CategoryForm,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'colaborator'] }
  },

  // Redirecciones (Siempre al final)
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
