// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data['roles'] as Array<string>; // Roles esperados de la ruta

    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/auth/login']);
    }

    const currentUserRole = this.authService.getCurrentUserRole();

    if (requiredRoles && requiredRoles.length > 0) {
      if (currentUserRole && requiredRoles.includes(currentUserRole)) {
        return true; // Usuario tiene el rol necesario
      } else {
        // No tiene el rol, redirige a una página de acceso denegado
        return this.router.createUrlTree(['/auth/access']);
      }
    }

    return true; // Si no se especifican roles, cualquier usuario logueado puede acceder
  }
}