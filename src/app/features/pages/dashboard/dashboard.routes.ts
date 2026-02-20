import { Routes } from '@angular/router';
import { roleGuard } from '../../../core/guards/role-guard';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: 'products',
        loadComponent: () => import('../products/product-list/product-list'),
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
    },
    {
        path: 'users',
        loadComponent: () => import('../users/user-list/user-list'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'categories',
        loadComponent: () => import('../categories/category-list/category-list'),
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
    },
    {
        path: 'product/new',
        loadComponent: () => import('../products/product-new-form/product-new-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'product/edit/:id',
        loadComponent: () => import('../products/product-edit-form/product-edit-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'users/new',
        loadComponent: () => import('../users/user-new-form/user-new-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'users/edit',
        loadComponent: () => import('../users/user-edit-form/user-edit-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'categories/new',
        loadComponent: () => import('../categories/category-form/category-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
    },
    {
        path: 'categories/edit/:id',
        loadComponent: () => import('../categories/category-form/category-form'),
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
    },
];
