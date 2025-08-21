// src/app/pages/uikit/forms-empresa/forms-empresa.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Fluid, FluidModule } from "primeng/fluid";
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DepartamentoService } from '@/pages/service/departamento.service';
import { NodeService } from '@/pages/service/node.service';
import { TreeNode, MessageService } from 'primeng/api';
import { FormularioService } from '../../../services/formulario.service';
import { FormularioPostulacion } from '../../../models/formulario.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DataSharingService } from '@/services/data-sharing.service';

export interface Empresa {
  nombre: string;
  iniciales: string;
  direccion: string;
  cargoAsignado: string;
  areaAsignada: string;
  numeroAutorizacion: string;
  categoriaPuesto: string;
  fechaAsignacionPuesto: Date | undefined;
  aprobacionAsignacion: boolean;
  observaciones: string;

}


@Component({
  selector: 'app-forms-empresa',
  standalone: true,
  imports: [
    InputTextModule,
    FluidModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    TextareaModule,
    DatePickerModule,
    AutoCompleteModule,
    CommonModule,
    CardModule,
    CheckboxModule,
    ToastModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    InputNumberModule,
    ToggleSwitchModule
  ],
  templateUrl: './forms-empresa.html',
  styleUrls: ['./forms-empresa.scss'],
  providers: [DepartamentoService, NodeService, MessageService]
})
export class FormsEmpresa implements OnInit {

  // Variable para controlar la visibilidad del diálogo modal
  mostrarDialogoExito: boolean = false;

  // Modelo del formulario
  formulario: FormularioPostulacion = {
    empresa: {
      nombre: '',
      iniciales: '',
      email: '',
      telefono: 0,
      nit: '',
      pdfNit: undefined,
      tipoRed: '',
      id: '',
      fechaExpiracion: new Date()
    },

    referencia: {
      nombre: '',
      email: ''
    },
    empleados: [],
    //experiencias: [],
    pdfDatosEmpresa: undefined,
    status: 'pendiente',
    id: '',
    fotoEmpresa: undefined
  };

  empresa: Empresa = {
    nombre: '',
    direccion: '',
    cargoAsignado: '',
    areaAsignada: '',
    numeroAutorizacion: '',
    categoriaPuesto: '',
    fechaAsignacionPuesto: undefined,
    aprobacionAsignacion: false,
    observaciones: '',
    iniciales: ''
  };

  calendarValue: any = null;
  autoValue: any[] | undefined;
  autoFilteredValue: any[] = [];
  selectedAutoValue: any = null;

  departamentoService = inject(DepartamentoService);
  nodeService = inject(NodeService);
  treeSelectNodes!: TreeNode[];
  formularioInicial: FormularioPostulacion | undefined;

  constructor(
    private fb: FormBuilder, //
    private dataSharingService: DataSharingService, //
    private formularioService: FormularioService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.departamentoService.getDepartamentos().then((countries) => {
      this.autoValue = countries;
    });
  }

  areas = [
    { label: 'Doméstica', value: 'Domestica' },
    { label: 'Comercial', value: 'Comercial' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Red empresarial', value: 'Red empresarial' }
  ];

  dropdownValues = [
    { name: 'La Paz', code: 'LP' },
    { name: 'cochabamba', code: 'CH' },
    { name: 'santa Cruz', code: 'SZ' },
    { name: 'oruro', code: 'OR' },
    { name: 'sucre', code: 'SC' },
    { name: 'beni', code: 'BE' },
    { name: 'tarija', code: 'TJ' },
    { name: 'potosi', code: 'PO' },
    { name: 'pando', code: 'PA' },
  ];

  dropdownValue: any = null;

  ngOnInit() {
    this.nodeService.getFiles().then((data) => (this.treeSelectNodes = data));
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < (this.autoValue as any[]).length; i++) {
      const departamento = (this.autoValue as any[])[i];
      if (departamento.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(departamento);
      }
    }
    this.autoFilteredValue = filtered;
  }

  dropdownItems = [
    { name: 'activo 🟢', code: 'Option 1' },
    { name: 'inactivo 🔴 ', code: 'Option 3' }
  ];

  dropdownItem = null;

  limpiarFormulario() {
    this.empresa = {
      nombre: '',
      iniciales: '',
      direccion: '',
      cargoAsignado: '',
      areaAsignada: '',
      numeroAutorizacion: '',
      categoriaPuesto: '',
      fechaAsignacionPuesto: undefined,
      aprobacionAsignacion: false,
      observaciones: ''
    };
  }

  enviarFormulario() {
    // Verificar si los campos obligatorios están completos
    if (!this.empresa.nombre || !this.empresa.cargoAsignado) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, complete los campos obligatorios.' });
      return;
    }

    // Sincronizar datos del modelo "empresa" con el modelo "formulario"
    this.formulario.empresa.nombre = this.empresa.nombre;
    // ... Sincroniza los demás campos de "empresa" aquí ...
    this.formulario.empresa.email = this.formulario.empresa.email; // Asegúrate de que este dato venga de alguna parte del formulario
    this.formulario.empresa.telefono = this.formulario.empresa.telefono; // Asegúrate de que este dato venga de alguna parte del formulario
    this.formulario.empresa.nit = this.formulario.empresa.nit; // Asegúrate de que este dato venga de alguna parte del formulario
    // Puedes continuar con todos los campos que quieras transferir

    // --- CÓDIGO AÑADIDO ---
    // 1. Guardar los datos en el servicio antes de hacer la llamada a la API
    this.dataSharingService.setEmpresaData(this.empresa);
    // --- FIN DEL CÓDIGO AÑADIDO ---
    
    // Llamada al servicio de la API
    this.formularioService.submitFormulario(this.formulario).subscribe(
      res => {
        this.mostrarDialogoExito = true;
        this.limpiarFormulario(); // Limpia el formulario después de un envío exitoso
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al enviar formulario' });
      }
    );
  }

  volverAlDashboard() {
    this.mostrarDialogoExito = false;
    // Redirigir al componente donde se mostrarán los datos
    this.router.navigate(['/curriculum-empresa']);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formulario.fotoEmpresa = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }
}