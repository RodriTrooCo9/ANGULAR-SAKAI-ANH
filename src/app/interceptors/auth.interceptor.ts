// src/app/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http'; // Importa HttpInterceptorFn
import { inject } from '@angular/core'; // Necesario para inject en interceptores funcionales
import { AuthService } from '../services/auth.service'; // Asegúrate de la ruta correcta

// Define tu interceptor como una función
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Inyecta el servicio usando inject()

  const authToken = authService.getToken();

   console.log('Interceptor: Solicitud interceptada:', req.url); // Para depuración
   console.log('Interceptor: Token obtenido:', authToken); // Para depuración

  // Si existe un token y la solicitud va a tu API (no a un recurso externo)
  // Asegúrate de que '/api' coincida con la ruta base de tu proxy
  if (authToken && req.url.startsWith('/api')) {
     console.log('Interceptor: Añadiendo token al encabezado Authorization.'); // Para depuración
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authRequest); // Llama a next como una función
  }

   console.log('Interceptor: No se añadió el token o la URL no es /api:', req.url); // Para depuración
  return next(req); // Llama a next como una función
};