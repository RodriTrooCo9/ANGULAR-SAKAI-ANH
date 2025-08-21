import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

// Importa los modelos y servicios necesarios
import { FormularioPostulacion } from '../../../models/formulario.model';
import { FormularioService } from '../../../services/formulario.service';

@Component({
  selector: 'app-forms-pendientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    DialogModule,
    CheckboxModule,
    InputTextModule,
  ],

  templateUrl: './forms-pendientes.html',
  styleUrls: ['./forms-pendientes.scss']
})
export class FormsPendientes implements OnInit {

  formularios: FormularioPostulacion[] = [];
  formularioSeleccionado: FormularioPostulacion | null = null;
  displayDialogRevisar = false;

  // Propiedades de aprobación
 aprobacionDatosEmpresa = false;
 aprobacionReferencias = false;
 aprobacionEmpleados = false;
 aprobacionExperiencia = false;
 aprobacionGeneral = false;

  constructor(private formularioService: FormularioService) {}

 
 ngOnInit(): void {
  // Simular la carga de datos (en un caso real, esto vendría de un servicio)
  this.formularios = [
    {
      id: '1',
      empresa: {
        id: 'e1',
        nombre: 'Empresa A',
        iniciales: 'EA',
        email: 'empresaA@email.com',
        telefono: 123,
        nit: 'NIT123',
        pdfNit: undefined,
        // CORRECCIÓN: Añadir las propiedades requeridas 'logoUrl' y 'tipoRed'
        logoUrl: 'assets/demo/images/product/galaxy-earbuds.jpg',
        tipoRed: 'empresarial',
        fechaExpiracion: new Date('2028-01-01')
      },
      referencia: { nombre: 'Juan Pérez', email: 'juan@email.com' },
      empleados: [],
      //experiencias: [], 
      pdfDatosEmpresa: undefined,
      status: 'pendiente',
      fotoEmpresa: undefined
    },
    {
      id: '2',
      empresa: {
        id: 'e2',
        nombre: 'Empresa B',
        iniciales: 'EB',
        email: 'empresaB@email.com',
        telefono: 456,
        nit: 'NIT456',
        pdfNit: undefined,
        // CORRECCIÓN: Añadir las propiedades requeridas 'logoUrl' y 'tipoRed'
        logoUrl: 'assets/demo/images/product/bamboo-watch.jpg',
        tipoRed: 'domestica',
        fechaExpiracion: new Date('2028-01-01')
      },
      referencia: { nombre: 'Ana Gómez', email: 'ana@email.com' },
      empleados: [],
      //experiencias: [], 
      pdfDatosEmpresa: undefined,
      status: 'pendiente',
      fotoEmpresa: undefined
    },
  ];
 }
  revisarFormulario(formulario: FormularioPostulacion) {
    this.formularioSeleccionado = formulario;
    // Reiniciar el estado de las casillas de verificación
    this.aprobacionDatosEmpresa = false;
    this.aprobacionReferencias = false;
    this.aprobacionEmpleados = false;
    this.aprobacionExperiencia = false;
    this.aprobacionGeneral = false;
    this.displayDialogRevisar = true;
  }

  aprobarFormulario() {
    if (this.formularioSeleccionado) {
      // Lógica para enviar la aprobación al servicio
      console.log('Formulario aprobado:', this.formularioSeleccionado.id);
      this.displayDialogRevisar = false;
      this.formularioSeleccionado = null;
    }
  }

  rechazarFormulario() {
     if (this.formularioSeleccionado) {
      // Lógica para enviar el rechazo al servicio
      console.log('Formulario rechazado:', this.formularioSeleccionado.id);
      this.displayDialogRevisar = false;
      this.formularioSeleccionado = null;
    }
  }

  cerrarDialogo() {
    this.displayDialogRevisar = false;
    this.formularioSeleccionado = null;
  }
}