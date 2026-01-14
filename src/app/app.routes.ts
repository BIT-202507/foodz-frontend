import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { PageNotFound } from './features/pages/page-not-found/page-not-found';
import { CategoryList } from './features/pages/categories/category-list/category-list';
import { CategoryForm } from './features/pages/categories/category-form/category-form';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '404', component: PageNotFound },
  { path: 'dashboard/categories', component: CategoryList },
  { path: 'dashboard/category/new', component: CategoryForm },
  { path: 'dashboard/category/edit/:id', component: CategoryForm },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
