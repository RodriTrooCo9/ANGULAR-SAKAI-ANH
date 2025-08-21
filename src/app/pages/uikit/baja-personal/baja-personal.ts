// src/app/pages/baja-personal/baja-personal.component.ts

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, FilterService, FilterMetadata } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { CardModule } from "primeng/card";
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { Table, TableFilterEvent } from 'primeng/table';
import { Router } from '@angular/router';

interface Trabajador {
    id: number;
    nombre: string;
    ci: string;
    empresa: {
        nombre: string;
        logo: string;
    };
    fechaContrato: Date;
    estado: string;
}

@Component({
    selector: 'app-baja-personal',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        TagModule,
        ButtonModule,
        InputTextModule,
        IconFieldModule,
        InputIconModule,
        DialogModule,
        PasswordModule,
        ToastModule,
        CardModule,
        SelectButtonModule,
        TooltipModule 
    ],
    templateUrl: './baja-personal.html',
    styleUrl: './baja-personal.scss',
    providers: [MessageService, ConfirmationService]
})
export class BajaPersonal implements OnInit {
    @ViewChild('dt') dt: Table | undefined;

    trabajadores: Trabajador[] = [];
    selectedTrabajadores: Trabajador[] = []; // Nuevo: para la selección múltiple
    loading = true;
    isAdmin = false;

    mostrarDialogo = false;
    passwordConfirmacion = '';
    trabajadorSeleccionado: Trabajador | null = null;

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private filterService: FilterService,
        private router: Router // Nuevo: servicio para la navegación
    ) {}

    ngOnInit() {
        this.authService.userRole$.subscribe(role => {
            this.isAdmin = role === 'Admin';
        });

        this.loadTrabajadores();
    }

    loadTrabajadores() {
        setTimeout(() => {
            this.trabajadores = [
                { id: 1, nombre: 'Juan Pérez', ci: '1234567 LP', empresa: { nombre: 'Tecnologías Globales S.A.', logo: 'ionibowcher.png' }, fechaContrato: new Date('2022-01-01'), estado: 'Activo' },
                { id: 2, nombre: 'Ana Gómez', ci: '9876543 CB', empresa: { nombre: 'Tecnologías Globales S.A.', logo: 'ionibowcher.png' }, fechaContrato: new Date('2021-03-15'), estado: 'Activo' },
                { id: 3, nombre: 'Carlos Ruiz', ci: '1122334 SC', empresa: { nombre: 'Innovación Digital Ltda.', logo: 'amyelsner.png' }, fechaContrato: new Date('2023-06-10'), estado: 'Inactivo' },
                { id: 4, nombre: 'María Lopez', ci: '5566778 CH', empresa: { nombre: 'Soluciones Empresariales Cía.', logo: 'asiyajavayant.png' }, fechaContrato: new Date('2022-09-20'), estado: 'Activo' },
                { id: 5, nombre: 'Pedro Vargas', ci: '9988776 OR', empresa: { nombre: 'Innovación Digital Ltda.', logo: 'amyelsner.png' }, fechaContrato: new Date('2023-01-05'), estado: 'En Revisión' }
            ];
            this.loading = false;
        }, 1000);
    }

    clear(table: Table) {
        table.clear();
    }
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    getSeverity(estado: string): string {
        switch (estado) {
            case 'Activo':
                return 'success';
            case 'Inactivo':
                return 'danger';
            case 'En Revisión':
                return 'warning';
            default:
                return 'info';
        }
    }

    darDeBaja(trabajador: Trabajador): void {
        if (this.isAdmin) {
            this.trabajadorSeleccionado = trabajador;
            this.mostrarDialogo = true;
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Acceso Denegado',
                detail: 'No tienes permisos de administrador para realizar esta acción.'
            });
        }
    }

    confirmarBaja(): void {
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
                    this.procederConBaja(this.trabajadorSeleccionado!.id);
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

    procederConBaja(idTrabajador: number): void {
        console.log(`Dando de baja a trabajador con ID: ${idTrabajador}`);
        this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `El trabajador ${this.trabajadorSeleccionado!.nombre} ha sido dado de baja.`
        });
        
        this.trabajadores = this.trabajadores.filter(t => t.id !== idTrabajador);

        this.mostrarDialogo = false;
        this.passwordConfirmacion = '';
        this.trabajadorSeleccionado = null;
    }
    
    // --- NUEVO MÉTODO PARA LA NAVEGACIÓN ---
    irASolicitudes(): void {
      if (this.selectedTrabajadores && this.selectedTrabajadores.length > 0) {
        console.log('Trabajadores seleccionados para dar de baja:', this.selectedTrabajadores);
        // Aquí podrías guardar los trabajadores seleccionados en un servicio
        // compartido antes de navegar, para que la página de solicitudes
        // pueda acceder a ellos.
        // Ejemplo: this.dataService.setTrabajadoresParaBaja(this.selectedTrabajadores);
        
        // Redirige a la página de solicitudes
        this.router.navigate(['./solicitudes']);

      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atención',
          detail: 'No ha seleccionado ningún trabajador.'
        });
      }
    }
}