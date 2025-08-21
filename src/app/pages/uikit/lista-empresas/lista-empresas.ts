import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';

// Importa tu modelo y servicio de formularios
import { FormularioPostulacion, DatosEmpresa } from '../../../models/formulario.model';
import { FormularioService } from '../../../services/formulario.service'; // Asegúrate de que este servicio exista

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-lista-empresas',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    templateUrl: './lista-empresas.html',
    styleUrl: './lista-empresas.scss',
    providers: [MessageService, FormularioService, ConfirmationService]
})
export class ListaEmpresas implements OnInit {
    
    empresaDialog: boolean = false;
    formularios = signal<FormularioPostulacion[]>([]);
    formulario!: FormularioPostulacion;
    selectedEmpresas!: FormularioPostulacion[] | null;
    submitted: boolean = false;
    
    // Lista de tipos de red para el diálogo
    tiposDeRed: any[] = [];
    
    cols!: Column[];
    exportColumns!: ExportColumn[];

    @ViewChild('dt') dt!: Table;

    constructor(
        private formularioService: FormularioService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loadFormularios();
    }

    loadFormularios() {
        // Simulando datos con el nuevo modelo
        this.formularios.set([
            {
                id: '1',
                empresa: {
                    nombre: 'Empresa A',
                    iniciales: 'EA',
                    email: 'empresaA@email.com',
                    telefono: 123, nit: 'NIT123',
                    pdfNit: undefined,
                    logoUrl: 'assets/demo/images/product/galaxy-earbuds.jpg',
                    tipoRed: 'empresarial',
                    id: '',
                    fechaExpiracion: new Date('2028-01-01')
                },
                referencia: {
                    nombre: 'Juan Pérez',
                    email: 'juan@email.com'
                },
                empleados: [],
                // experiencias: [], 
                pdfDatosEmpresa: undefined,
                status: 'aprobado',
                fotoEmpresa: undefined
            },
            {
                id: '2', empresa: {
                    nombre: 'Empresa B', iniciales: 'EB', email: 'empresaB@email.com', telefono: 456, nit: 'NIT456', pdfNit: undefined, logoUrl: 'assets/demo/images/product/bamboo-watch.jpg', tipoRed: 'domestica',
                    id: '',
                    fechaExpiracion: new Date('2028-01-01')
                }, referencia: { nombre: 'Ana Gómez', email: 'ana@email.com' }, empleados: [], pdfDatosEmpresa: undefined, status: 'aprobado',
                fotoEmpresa: undefined
            },
            {
                id: '3', empresa: {
                    nombre: 'Empresa C', iniciales: 'EC', email: 'empresaC@email.com', telefono: 789, nit: 'NIT789', pdfNit: undefined, logoUrl: 'assets/demo/images/product/gaming-mouse.jpg', tipoRed: 'industrial',
                    id: '',
                    fechaExpiracion: new Date('2028-01-01')
                }, referencia: { nombre: 'Carlos Ruiz', email: 'carlos@email.com' }, empleados: [], pdfDatosEmpresa: undefined, status: 'pendiente',
                fotoEmpresa: undefined
            },
        ]);

        this.tiposDeRed = [
          { label: 'Empresarial', value: 'empresarial' },
          { label: 'Doméstica', value: 'domestica' },
          { label: 'Industrial', value: 'industrial' }
        ];

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'empresa.logoUrl', header: 'Logo' },
            { field: 'empresa.nombre', header: 'Nombre' },
            { field: 'empresa.tipoRed', header: 'Tipo de Red' },
            { field: 'empresa.email', header: 'Email' },
            { field: 'status', header: 'Estado' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.formulario = {
            id: this.createId(),
            empresa: {
                nombre: '', 
                iniciales: '', 
                email: '', 
                telefono: 0, 
                nit: '', 
                pdfNit: undefined, 
                logoUrl: 'assets/demo/images/product/product-placeholder.svg', 
                tipoRed: '',
                id: '',
                fechaExpiracion: Date.now() as unknown as Date
            },
            referencia: { nombre: '', email: '' },
            empleados: [],
            //experiencias: [],
            pdfDatosEmpresa: undefined,
            status: 'pendiente',
            fotoEmpresa: undefined
        };
        this.submitted = false;
        this.empresaDialog = true;
    }

    editEmpresa(formulario: FormularioPostulacion) {
        this.formulario = { ...formulario };
        this.empresaDialog = true;
    }

    deleteSelectedEmpresas() {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar las empresas seleccionadas?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.formularios.set(this.formularios().filter((val) => !this.selectedEmpresas?.includes(val)));
                this.selectedEmpresas = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Empresas eliminadas',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.empresaDialog = false;
        this.submitted = false;
    }

    deleteEmpresa(formulario: FormularioPostulacion) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar a ' + formulario.empresa.nombre + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.formularios.set(this.formularios().filter((val) => val.id !== formulario.id));
                this.formulario = {
                     id: '', empresa: {
                         nombre: '', 
                         iniciales: '', 
                         email: '', 
                         telefono: 0, 
                         nit: '', 
                         pdfNit: undefined, 
                         logoUrl: '', 
                         tipoRed: '',
                         id: '',
                        
                         fechaExpiracion: new Date()
                     },
                     referencia: { nombre: '', email: '' }, empleados: [],  pdfDatosEmpresa: undefined, status: 'pendiente', fotoEmpresa: undefined
                };
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Empresa eliminada',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.formularios().length; i++) {
            if (this.formularios()[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    // AÑADIDO: Este es el método que soluciona el error en el HTML
    getSeverityForRed(tipoRed: string) {
        switch (tipoRed) {
            case 'empresarial':
                return 'info';
            case 'domestica':
                return 'success';
            case 'industrial':
                return 'warning';
            default:
                return 'primary';
        }
    }

    getSeverity(status: string) {
        switch (status) {
            case 'aprobado':
                return 'success';
            case 'pendiente':
                return 'warn';
            case 'rechazado':
                return 'danger';
            default:
                return 'info';
        }
    }

    saveEmpresa() {
        this.submitted = true;
        let _formularios = this.formularios();
        if (this.formulario.empresa.nombre?.trim()) {
            if (this.formulario.id) {
                _formularios[this.findIndexById(this.formulario.id)] = this.formulario;
                this.formularios.set([..._formularios]);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empresa actualizada', life: 3000 });
            } else {
                this.formulario.id = this.createId();
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empresa creada', life: 3000 });
                this.formularios.set([..._formularios, this.formulario]);
            }
            this.empresaDialog = false;
            this.formulario = { id: '', empresa: {
                nombre: '', iniciales: '', email: '', telefono: 0, nit: '', pdfNit: undefined, logoUrl: '', tipoRed: '',
                id: '',
                fechaExpiracion: new Date()
            }, referencia: { nombre: '', email: '' }, empleados: [], pdfDatosEmpresa: undefined, status: 'pendiente', fotoEmpresa: undefined };
        }
    }

    exportCSV() {
        this.dt.exportCSV();
    }
}