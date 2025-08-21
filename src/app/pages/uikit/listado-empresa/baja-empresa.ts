// src/app/pages/baja-empresa/baja-empresa.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../services/auth.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-baja-empresa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    PasswordModule,
    CardModule,
    ToastModule,
    TableModule,
    TagModule,
  ],
  templateUrl: './baja-empresa.html',
  styleUrl: './baja-empresa.scss',
  providers: [MessageService]
})
export class BajaEmpresa implements OnInit {

  isAdmin = false;
  mostrarDialogo = false;
  passwordConfirmacion = '';
  empresaSeleccionada: any = null;

  // Datos originales simulados
  empresasOriginal = [
    {
      nombre: 'Tecnologías Globales S.A.',
      ciudad: 'La Paz',
      logo: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
      trabajadores: [
        { nombre: 'Juan Pérez', ci: '1234567 LP', estado: 'activo', fechaContrato: '01/01/2022' },
        { nombre: 'Ana Gómez', ci: '9876543 CB', estado: 'activo', fechaContrato: '15/03/2021' }
      ]
    },
    {
      nombre: 'Innovación Digital Ltda.',
      ciudad: 'Santa Cruz',
      logo: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
      trabajadores: [
        { nombre: 'Carlos Ruiz', ci: '1122334 SC', estado: 'inactivo', fechaContrato: '10/06/2023' }
      ]
    }
  ];

  // Datos aplanados para la tabla con agrupamiento
  trabajadoresConEmpresa: any[] = [];

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = role === 'Admin';
    });

    // Preprocesamos los datos para la tabla
    this.trabajadoresConEmpresa = this.empresasOriginal.flatMap(empresa =>
      empresa.trabajadores.map(trabajador => ({
        ...trabajador,
        empresaNombre: empresa.nombre,
        empresaLogo: empresa.logo,
        empresaCiudad: empresa.ciudad
      }))
    );
  }

  // Método para contar trabajadores por empresa para el pie de grupo
  calculateTotalTrabajadores(empresaNombre: string): number {
    return this.trabajadoresConEmpresa.filter(t => t.empresaNombre === empresaNombre).length;
  }

  // Método para obtener la severidad del tag de estado
  getSeverity(estado: string): string {
    switch (estado) {
      case 'activo':
        return 'success';
      case 'inactivo':
        return 'danger';
      default:
        return 'info';
    }
  }

  darDeBaja(empresa: any): void {
    if (this.isAdmin) {
      this.empresaSeleccionada = empresa;
      this.mostrarDialogo = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Acceso Denegado',
        detail: 'No tienes permisos de administrador para realizar esta acción.'
      });
    }
  }

  confirmarEliminacion(): void {
    if (!this.passwordConfirmacion) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'La contraseña no puede estar vacía.'
      });
      return;
    }

    this.authService.verificarCredenciales(this.authService.getCurrentUserEmail(), this.passwordConfirmacion).subscribe(
      (isValid) => {
        if (isValid) {
          this.procederConEliminacion(this.empresaSeleccionada.id);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Contraseña incorrecta. La baja no se ha realizado.'
          });
          this.passwordConfirmacion = '';
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al verificar las credenciales.'
        });
      }
    );
  }

  procederConEliminacion(idEmpresa: number): void {
    console.log(`Eliminando empresa con ID: ${idEmpresa}`);
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `La empresa ${this.empresaSeleccionada.nombre} ha sido dada de baja.`
    });
    
    this.mostrarDialogo = false;
    this.passwordConfirmacion = '';
    this.empresaSeleccionada = null;
  }
}