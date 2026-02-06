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
import { CategoryNewForm } from './features/pages/categories/category-new-form/category-new-form';
import { CategoryEditForm } from './features/pages/categories/category-edit-form/category-edit-form';
import { Dashboard } from './features/pages/dashboard/dashboard';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '404', component: PageNotFound },
  { path: 'dashboard', component: Dashboard },
  { path: 'dashboard/products', component: ProductList },
  { path: 'dashboard/users', component: UserList },
  { path: 'dashboard/categories', component: CategoryList },
  { path: 'dashboard/product/new', component: ProductNewForm },
  { path: 'dashboard/product/edit', component: ProductEditForm },
  { path: 'dashboard/users/new', component: UserNewForm },
  { path: 'dashboard/users/edit', component: UserEditForm },
  { path: 'dashboard/categories/new', component: CategoryNewForm },
  { path: 'dashboard/categories/edit', component: CategoryEditForm },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
