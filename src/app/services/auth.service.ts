// src/app/guards/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'; // Importamos HttpClient

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'jwt_token';
  private readonly ROLE_KEY = 'user_role';
  private readonly SECCION_START_KEY = 'seccion_start';
  private readonly USER_EMAIL_KEY = 'user_email'; // Nueva clave para el email del usuario

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  private userRoleSubject = new BehaviorSubject<string | null>(this.getStoredRole());
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { } // Inyectamos HttpClient

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserRole(): string | null {
    return this.userRoleSubject.value;
  }

  // Nuevo método para obtener el email del usuario logueado
  getCurrentUserEmail(): string | null {
    return localStorage.getItem(this.USER_EMAIL_KEY);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return of(null).pipe(
      delay(500),
      tap(() => {
        let simulatedRole: string | null = null;
        let simulatedToken: string = 'simulated_jwt_token';
        
        if (credentials.email === 'admin@example.com' && credentials.password === 'Admin123!') {
          simulatedRole = 'Admin';
        } else if (credentials.email === 'user@example.com' && credentials.password === 'User123!') {
          simulatedRole = 'Usuario';
        } else if (credentials.email === 'dev@example.com' && credentials.password === 'Dev123!') {
          simulatedRole = 'Desarrollador';
        } else {
          console.error('Simulated Login Failed: Invalid credentials');
          this.logout();
          throw new Error('Credenciales inválidas');
        }

        localStorage.setItem(this.TOKEN_KEY, simulatedToken);
        localStorage.setItem(this.ROLE_KEY, simulatedRole || '');
        localStorage.setItem(this.USER_EMAIL_KEY, credentials.email); // Guardamos el email
        localStorage.setItem(this.SECCION_START_KEY, new Date().getTime().toString());
        
        this.loggedIn.next(true);
        this.userRoleSubject.next(simulatedRole);

        console.log(`Simulated Login Successful for ${credentials.email} with role: ${simulatedRole}`);
        return { token: simulatedToken, email: credentials.email, role: simulatedRole };
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.SECCION_START_KEY);
    localStorage.removeItem(this.USER_EMAIL_KEY); // Eliminamos el email
    
    this.loggedIn.next(false);
    this.userRoleSubject.next(null);
    this.router.navigate(['/auth/login']);
    console.log('Simulated Logout');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const seccionStart = localStorage.getItem(this.SECCION_START_KEY);
    if (!seccionStart) {
      this.logout();
      return false;
    }

    const startTimestamp = parseInt(seccionStart, 10);
    const now = new Date().getTime();
    const unaHoraEnMilisegundos = 60 * 60 * 1000;

    if (now - startTimestamp > unaHoraEnMilisegundos) {
      this.logout();
      return false;
    }
    
    return true;
  }

  /**
   * Verifica las credenciales de un usuario.
   * En un entorno real, esta sería una llamada a una API de tu backend.
   */
  verificarCredenciales(email: string | null, password: string): Observable<boolean> {
    // Si no hay email en la sesión, la verificación falla
    if (!email) {
      return of(false);
    }

    // Simulación: verificamos si la contraseña coincide con la del usuario logueado
    // que, para el ejemplo, es 'admin@example.com' con la contraseña 'Admin123!'
    const isPasswordCorrect = (email === 'admin@example.com' && password === 'Admin123!');
    
    return of(isPasswordCorrect).pipe(delay(300)); // Retardo para simular la red
  }
}




/* 
// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL de tu API de backend
  private apiUrl = 'http://localhost:3000/api/auth'; // Ejemplo de URL

  private readonly TOKEN_KEY = 'jwt_token';
  private readonly ROLE_KEY = 'user_role';
  private readonly USER_EMAIL_KEY = 'user_email';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  private userRoleSubject = new BehaviorSubject<string | null>(this.getStoredRole());
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUserRole(): string | null {
    return this.userRoleSubject.value;
  }

  getCurrentUserEmail(): string | null {
    return localStorage.getItem(this.USER_EMAIL_KEY);
  }

 
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // El backend debe devolver un objeto con token, role y email.
        if (response && response.token && response.role) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          localStorage.setItem(this.ROLE_KEY, response.role);
          localStorage.setItem(this.USER_EMAIL_KEY, response.email);

          this.loggedIn.next(true);
          this.userRoleSubject.next(response.role);

          console.log(`Login successful for ${response.email} with role: ${response.role}`);
        }
      }),
      catchError(error => {
        // Si el login falla, el backend devolverá un error (ej. 401 Unauthorized)
        console.error('Login Failed:', error);
        this.logout();
        throw new Error('Credenciales inválidas');
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USER_EMAIL_KEY);
    
    this.loggedIn.next(false);
    this.userRoleSubject.next(null);
    this.router.navigate(['/auth/login']);
  }
  isLoggedIn(): boolean {
    return this.hasToken();
  }
}
*/