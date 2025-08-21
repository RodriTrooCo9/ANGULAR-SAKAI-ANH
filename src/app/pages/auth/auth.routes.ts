// src/app/pages/auth/auth.routes.ts
import { Routes } from '@angular/router';
import { Access } from './access/access'; // Asegúrate de que estas rutas de componentes sean correctas
import { Login } from './login/login';   // Aquí está tu componente de Login
import { Error } from './error/error';   // Asegúrate de que estas rutas de componentes sean correctas

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    // Si tu componente de Login ya está en app.routes.ts, puedes quitarlo de aquí
    // O si quieres que /auth/login sea también una opción:
    { path: 'login', component: Login }
] as Routes;