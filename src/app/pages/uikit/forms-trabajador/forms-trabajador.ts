// src/app/componentes/formulario-empleado/formulario-empleado.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker'; 
//import { DropdownModule } from 'primeng/dropdown';
//import { CalendarModule } from 'primeng/calendar';

import { PerfilService } from '../../../services/perfil.service';
import { Usuario } from '../../../models/perfil-usuario.model';


import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formulario-empleado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    CheckboxModule,
    ToastModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    DatePickerModule,
    
  ],
  templateUrl: './forms-trabajador.html',
  styleUrls: ['./forms-trabajador.scss'],
  providers: [MessageService]
})
export class FormsTrabajador implements OnInit {

 trabajador: any = {};
  calendarValue: any = null;
  
  experiencias: any[] = [{ empresa: '', cargo: '', fechaInicio: null, fechaFin: null }];

  lugaresEmision = [
    { name: 'La Paz', code: 'LPZ' },
    { name: 'Cochabamba', code: 'CBA' },
    { name: 'Santa Cruz', code: 'SCZ' },
    { name: 'Oruro', code: 'ORU' },
    { name: 'Potosí', code: 'PTI' },
    { name: 'Tarija', code: 'TJA' },
    { name: 'Sucre', code: 'SRE' },
    { name: 'Beni', code: 'BEN' },
    { name: 'Pando', code: 'PND' }
  ];

  tiposContrato = [
    { name: 'Plazo Fijo', code: 'FIJO' },
    { name: 'Indefinido', code: 'INDEFINIDO' },
  ];

  constructor(
    private messageService: MessageService,
    private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.trabajador = {
      tieneTituloProfesional: false
    };
  }

  enviarFormulario() {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Formulario enviado.' });
    console.log('Formulario enviado:', this.trabajador);

    const nuevoUsuario: Usuario = {
      // Usar un ID temporal, en un caso real vendría de la base de datos
      id: '1', 
      nombre: this.trabajador.nombresApellidos.split(' ')[0],
      apellido: this.trabajador.nombresApellidos.split(' ').slice(1).join(' '),
      email: '', // No está en el formulario, se podría añadir
      telefono: this.trabajador.numeroCelular,
      fechaNacimiento: this.trabajador.fechaNacimiento,
      direccion: this.trabajador.direccionDomicilio,
      rol: 'Empleado', // Valor por defecto
      bio: '', // Se podría añadir un campo de biografía al formulario
      habilidades: [], // Se podría añadir un campo de habilidades
      edad: 0, // Se puede calcular a partir de la fecha de nacimiento
      ingresos: 0, // Se podría añadir este campo
      profesion: '', // Se podría añadir este campo
      avatarUrl: '' // Se podría añadir la URL de la foto subida
    };



  }
   agregarExperiencia() {
    if (this.experiencias.length < 5) {
      this.experiencias.push({ empresa: '', cargo: '', fechaInicio: null, fechaFin: null });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Límite alcanzado', detail: 'No puedes agregar más de 5 experiencias laborales.' });
    }
  }

  limpiarFormulario() {
    this.trabajador = {
      tieneTituloProfesional: false
    };
    this.messageService.add({ severity: 'info', summary: 'Limpiado', detail: 'Formulario reiniciado.' });
  }

  onUpload(event: any, tipo: string) {
    this.messageService.add({ severity: 'info', summary: 'Archivo Subido', detail: event.files[0].name });
  }
}