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

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '404', component: PageNotFound },
  { path: 'dashboard', component: Dashboard, canActivate: [ authGuard ] },
  { path: 'dashboard/products', component: ProductList, canActivate: [ authGuard ] },
  { path: 'dashboard/users', component: UserList, canActivate: [ authGuard ] },
  { path: 'dashboard/categories', component: CategoryList, canActivate: [ authGuard ] },
  { path: 'dashboard/product/new', component: ProductNewForm, canActivate: [ authGuard ] },
  { path: 'dashboard/product/edit/:id', component: ProductEditForm, canActivate: [ authGuard ] },
  { path: 'dashboard/users/new', component: UserNewForm, canActivate: [ authGuard ] },
  { path: 'dashboard/users/edit', component: UserEditForm, canActivate: [ authGuard ] },
  { path: 'dashboard/categories/new', component: CategoryForm, canActivate: [ authGuard ] },
  { path: 'dashboard/categories/edit/:id', component: CategoryForm, canActivate: [ authGuard ] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
