import { Routes } from '@angular/router';
import { roleGuard } from '../../../core/guards/role-guard';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: 'products',
        children: [
            {
                path: '',
                loadComponent: () => import('../products/product-list/product-list'),
            },
            {
                path: 'new',
                loadComponent: () => import('../products/product-new-form/product-new-form'),
                data: { roles: ['admin'] }
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('../products/product-edit-form/product-edit-form'),
                data: { roles: ['admin'] }
            }
        ],
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
    },
    {
        path: 'users',
        children: [
            {
                path: '',
                loadComponent: () => import('../users/user-list/user-list'),
            },
            {
                path: 'new',
                loadComponent: () => import('../users/user-new-form/user-new-form'),
            },
            {
                path: 'edit',
                loadComponent: () => import('../users/user-edit-form/user-edit-form'),
            }
        ],
        canActivate: [roleGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'categories',
        children: [
            {
                path: '',
                loadComponent: () => import('../categories/category-list/category-list'),
            },
            {
                path: 'new',
                loadComponent: () => import('../categories/category-form/category-form'),
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('../categories/category-form/category-form'),
            }
        ],
        canActivate: [roleGuard],
        data: { roles: ['admin', 'colaborator'] }
    },
];
