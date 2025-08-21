// src/app/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtén el rol(es) requerido(s) de la configuración de la ruta
  const requiredRoles = route.data['roles'] as Array<string>;

  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  const userRole = authService.getUserRole();

  if (!userRole) {
    // No hay rol para el usuario, no está autenticado o el token es inválido
    authService.logout(); // Limpiar token inválido
    router.navigate(['/login']);
    return false;
  }

  // Verifica si el rol del usuario está incluido en los roles requeridos
  if (requiredRoles.includes(userRole)) {
    return true; // El usuario tiene el rol requerido, permite el acceso
  } else {
    // El usuario no tiene el rol requerido, redirige a una página de acceso denegado o al dashboard
    console.warn(`Acceso denegado: El usuario con rol "${userRole}" intentó acceder a una ruta que requiere roles: ${requiredRoles.join(', ')}`);
    router.navigate(['/accessdenied']); // Crea una página para "Acceso Denegado"
    return false;
  }
};