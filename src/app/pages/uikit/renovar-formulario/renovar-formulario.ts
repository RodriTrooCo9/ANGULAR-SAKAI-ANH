import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
//import { InputTextareaModule } from 'primeng/inputtextarea';
// Importamos las interfaces corregidas
import { FormularioPostulacion, Personal, ExperienciaTrabajo } from '../../../models/formulario.model';
import { Panel } from "primeng/panel";

@Component({
  selector: 'app-renovar-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DialogModule,
    TableModule,
    Panel
],
  templateUrl: './renovar-formulario.html',
  styleUrls: ['./renovar-formulario.scss']
})
export class RenovarFormulario implements OnInit {
renovarTrabajador(_t28: Personal) {
throw new Error('Method not implemented.');
}

  @Input() formulario!: FormularioPostulacion;

  displayDialog: boolean = false;
  
  // Propiedades para añadir nueva experiencia laboral
  nuevaExperiencia: ExperienciaTrabajo = { id: '', puesto: '', descripcion: '' };

  // Propiedad para mantener el personal actual, usando la nueva interfaz 'Personal'
  personalSeleccionado: Personal | null = null;
  
  constructor() { }

  ngOnInit(): void {
    if (!this.formulario) {
      this.formulario = {
        id: '1',
        empresa: { 
            id: 'e1', 
            nombre: 'Empresa Demo', 
            iniciales: 'ED', 
            email: 'demo@empresa.com', 
            telefono: 12345, 
            nit: 'NIT123', 
            pdfNit: undefined, 
            fechaExpiracion: new Date('2028-01-01'),
            tipoRed: 'empresarial'
        },
        referencia: { nombre: 'Referencia Demo', email: 'ref@empresa.com' },
        empleados: [
          {
            id: 't1',
            nombre: 'Juan Perez',
            numeroCI: '1234567',
            estado: 'activo',
            experiencias: [
              { id: 'ex1', puesto: 'Desarrollador Junior', descripcion: 'Desarrollo de APIs.' }
            ],
            renovacion: {
              ultimaRenovacion: new Date('2023-01-01'),
              fechaExpiracion: new Date('2028-01-01')
            }
          }
        ],
        //experiencias: [],
        pdfDatosEmpresa: undefined,
        status: 'aprobado',
        fotoEmpresa: undefined
      };
    }
  }

  // Métodos que ahora usan 'Personal'
  abrirDialogoExperiencia(personal: Personal) {
    this.personalSeleccionado = personal;
    this.displayDialog = true;
    this.nuevaExperiencia = { id: '', puesto: '', descripcion: '' };
  }
  
  guardarExperiencia() {
    if (this.personalSeleccionado) {
      this.nuevaExperiencia.id = 'ex' + Math.floor(Math.random() * 1000);
      this.personalSeleccionado.experiencias.push(this.nuevaExperiencia);
    }
    
    this.displayDialog = false;
    this.personalSeleccionado = null;
  }

  renovarPersonal(personal: Personal): void {
      personal.renovacion.ultimaRenovacion = new Date();
      const nuevaFechaExpiracion = new Date();
      nuevaFechaExpiracion.setFullYear(nuevaFechaExpiracion.getFullYear() + 5);
      personal.renovacion.fechaExpiracion = nuevaFechaExpiracion;
      
      console.log(`Renovación del personal ${personal.nombre} realizada. Nueva expiración: ${personal.renovacion.fechaExpiracion.toLocaleDateString()}`);
  }
  
  renovarEmpresa(): void {
      const nuevaFechaExpiracion = new Date();
      nuevaFechaExpiracion.setFullYear(nuevaFechaExpiracion.getFullYear() + 5);
      this.formulario.empresa.fechaExpiracion = nuevaFechaExpiracion;
      
      console.log(`Renovación de la empresa ${this.formulario.empresa.nombre} realizada. Nueva expiración: ${this.formulario.empresa.fechaExpiracion.toLocaleDateString()}`);
  }
}