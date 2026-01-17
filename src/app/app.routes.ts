import { Routes } from '@angular/router';
import { Home } from './features/pages/home/home';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { PageNotFound } from './features/pages/page-not-found/page-not-found';
import { CategoryList } from './features/pages/categories/category-list/category-list';
import { CategoryNewForm } from './features/pages/categories/category-new-form/category-new-form';
import { CategoryEditForm } from './features/pages/categories/category-edit-form/category-edit-form';

export const routes: Routes = [
  // Componentes de pagina: Usando una ruta para acceder a ellos. No olvidar ponerlos de forma escalonada, de acuerdo a la profundudad de la ruta.
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '404', component: PageNotFound },
  { path: 'dashboard/categories', component: CategoryList },
  { path: 'dashboard/category/new', component: CategoryNewForm },
  { path: 'dashboard/category/edit/:id', component: CategoryEditForm },
  // Las redirecciones siempre abajo de todas las definiciones de ruta de la aplicación
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
