// src/app/pages/auth/login/login.ts (o login.component.ts)

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // Ajusta esta ruta si tu AuthService está en otro lugar

// Importaciones de PrimeNG necesarias para los componentes en tu HTML
import { InputTextModule } from 'primeng/inputtext'; // Para pInputText
import { ButtonModule } from 'primeng/button';       // Para p-button
import { PasswordModule } from 'primeng/password';   // Para p-password
import { CheckboxModule } from 'primeng/checkbox';   // Para p-checkbox (si lo vas a enlazar)
import { MessageModule } from 'primeng/message';     // Opcional, si quieres usar p-message para mostrar errores en lugar de un div simple

import { CommonModule } from '@angular/common'; 
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import {AppFooter} from '../../../layout/component/footer/footer.component';

@Component({
  selector: 'app-login', // Asegúrate de que este selector coincida con cómo lo usas (ej. en auth.routes.ts si lo cargas por componente)
  standalone: true, // Esto indica que es un componente standalone
  imports: [
    CommonModule,        // Para *ngIf, *ngFor, [ngClass], etc.
    ReactiveFormsModule, // Para usar formularios reactivos
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    AppFloatingConfigurator,
    AppFooter
    
    // MessageModule // Descomenta si decides usar <p-message> en tu HTML en lugar de <div> para errores
  ],
  templateUrl: './login.html', // Ruta a tu archivo HTML
  styleUrls: ['./login.scss']  // Ruta a tus estilos SCSS (o .css)
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false; // Variable para controlar el estado de carga del botón

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicialización del formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de email con validación requerida y de formato email
      password: ['', Validators.required],                  // Campo de contraseña con validación requerida
      rememberMe: [false]                                   // Campo para el checkbox "Recordarme"
    });
  }

  // Getter conveniente para acceder a los controles del formulario en el template (ej. f['email'].errors)
  get f() {
    return this.loginForm.controls;
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    this.errorMessage = null; // Limpiar cualquier mensaje de error anterior
    this.isLoading = true;    // Activar el estado de carga

    if (this.loginForm.valid) { // Verificar si el formulario es válido
      const { email, password } = this.loginForm.value; // Obtener los valores del formulario

      // Llamar al servicio de autenticación para intentar el login
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          // Si el login es exitoso
          console.log('Login exitoso:', response);
          this.router.navigate(['/dashboard']); // Redirigir al dashboard
          this.isLoading = false; // Desactivar el estado de carga
        },
        error: (err) => {
          // Si hay un error en el login
          console.error('Error de login:', err);
          // Mostrar un mensaje de error amigable al usuario
          this.errorMessage = err.error?.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
          this.isLoading = false; // Desactivar el estado de carga
        }
      });
    } else {
      // Si el formulario no es válido antes de intentar la petición HTTP
      this.errorMessage = 'Por favor, introduce un email y contraseña válidos.';
      this.loginForm.markAllAsTouched(); // Marcar todos los campos como tocados para que se muestren los mensajes de error de validación
      this.isLoading = false; // Desactivar el estado de carga
    }
  }
}