import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos de PrimeNG
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

// Puedes definir una interfaz para los documentos para mayor claridad
export interface DocumentoLegal {
    id: number;
    nombre: string;
    tipo: 'Empresa' | 'Empleado';
    propietario: string;
    fechaSubida: Date;
    estado: 'Pendiente' | 'Aprobado' | 'Rechazado' | 'En Revisión';
}

@Component({
    selector: 'app-area-legal',
    standalone: true,
    imports: [
        CommonModule,
        PanelModule,
        CardModule,
        TableModule,
        ButtonModule,
        TagModule,
        BadgeModule,
        TooltipModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule
    ],
    templateUrl: './area-legal.html',
    styleUrls: ['./area-legal.scss']
})
export class AreaLegal implements OnInit {

    documentos: DocumentoLegal[] = [];
    loading: boolean = true;
    
    resumen = {
        pendientes: 160,
        renovaciones: 25,
        totalUsuarios: 28441,
        nuevosUsuarios: 24,
        usuariosRegistrados: 520,
        totalEmpresas: 152,
        empresasRevision: 20
    };

    ngOnInit(): void {
        this.documentos = this.generarDocumentosDeEjemplo();
        this.loading = false;
    }

    generarDocumentosDeEjemplo(): DocumentoLegal[] {
        // Simulación de datos de documentos
        return [
            { id: 1, nombre: 'Contrato de Trabajo - Juan Pérez', tipo: 'Empleado', propietario: 'Juan Pérez', fechaSubida: new Date('2024-05-10'), estado: 'Pendiente' },
            { id: 2, nombre: 'Poder General Empresa XYZ', tipo: 'Empresa', propietario: 'Empresa XYZ', fechaSubida: new Date('2024-05-11'), estado: 'Pendiente' },
            { id: 3, nombre: 'Estatutos Constitutivos', tipo: 'Empresa', propietario: 'Empresa ABC', fechaSubida: new Date('2024-04-25'), estado: 'Aprobado' },
            { id: 4, nombre: 'Copia C.I. María Solís', tipo: 'Empleado', propietario: 'María Solís', fechaSubida: new Date('2024-05-08'), estado: 'Aprobado' },
            { id: 5, nombre: 'Contrato de Suministro', tipo: 'Empresa', propietario: 'Empresa XYZ', fechaSubida: new Date('2024-05-01'), estado: 'Rechazado' },
            { id: 6, nombre: 'Solicitud de Permiso', tipo: 'Empleado', propietario: 'Carlos Mendoza', fechaSubida: new Date('2024-05-12'), estado: 'En Revisión' },
        ];
    }

    getSeverity(estado: string): string {
        switch (estado) {
            case 'Aprobado':
                return 'success';
            case 'Pendiente':
            case 'En Revisión':
                return 'warning';
            case 'Rechazado':
                return 'danger';
            default:
                return 'info';
        }
    }

    onGlobalFilter(table: any, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    revisarDocumento(doc: DocumentoLegal) {
        // Lógica para revisar, abrir modal, etc.
        console.log('Revisando documento:', doc.nombre);
    }
    
    aprobarDocumento(doc: DocumentoLegal) {
        doc.estado = 'Aprobado';
    }
    
    rechazarDocumento(doc: DocumentoLegal) {
        doc.estado = 'Rechazado';
    }
}