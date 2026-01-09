import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { PageNotFound } from './features/pages/page-not-found/page-not-found';
import { ProductList } from './features/pages/products/product-list/product-list';
import { ProductNewForm } from './features/pages/products/product-new-form/product-new-form';
import { ProductEditForm } from './features/pages/products/product-edit-form/product-edit-form';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '404', component: PageNotFound },
  { path: 'dashboard/products', component: ProductList },
  { path: 'dashboard/product/new', component: ProductNewForm },
  { path: 'dashboard/product/edit', component: ProductEditForm },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
