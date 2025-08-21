// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout'; // Asegúrate de que esta ruta sea correcta
import { Dashboard } from './app/pages/dashboard/dashboard';     // Asegúrate de que esta ruta sea correcta
import { Notfound } from './app/pages/notfound/notfound/notfound'; // Asegúrate de que esta ruta sea correcta
import { AuthGuard } from './app/guards/auth.guard'; 
export const appRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./app/pages/auth/login/login').then(m => m.Login)
    },
    {
        path: 'auth',
        loadChildren: () => import('./app/pages/auth/auth.routes')
    },
    {
        path: '', 
        component: AppLayout,
        canActivate: [AuthGuard], 
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];