import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';

// ¡IMPORTANTE! Asegúrate de que estas dos líneas estén presentes
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
// Importa las librerías
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.html',
  styleUrls: ['./solicitud.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    DialogModule
  ]
})
export class Solicitud implements OnInit {

  solicitudForm! : FormGroup;
  mostrarDialogo: boolean = false;
  tiposSolicitud = [
    { label: 'Baja de Trabajador', value: 'trabajador' },
    { label: 'Baja de Empresa', value: 'empresa' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      tipo: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
      telefonoContacto: [''],
      correoContacto: [''],
      nombre: ['', Validators.required],
      ci_nit: ['', Validators.required],
      
      cargo: [''],
      areaDepartamento: [''],
      fechaIngreso: [''],
      fechaBaja: [''],
      tipoBaja: [''],
      
      actividadEconomica: [''],
      numeroRegistroPatronal: [''],
      representanteLegal: [''],
      ciRepresentante: [''],
      direccionEmpresa: [''],
      fechaCeseActividades: [''],
      
      observaciones: [''],
      adjuntos: ['']
    });

    this.solicitudForm.get('tipo')?.valueChanges.subscribe(tipo => {
      this.solicitudForm.get('cargo')?.clearValidators();
      this.solicitudForm.get('actividadEconomica')?.clearValidators();

      if (tipo === 'trabajador') {
        this.solicitudForm.get('cargo')?.setValidators(Validators.required);
      } else if (tipo === 'empresa') {
        this.solicitudForm.get('actividadEconomica')?.setValidators(Validators.required);
      }
      this.solicitudForm.get('cargo')?.updateValueAndValidity();
      this.solicitudForm.get('actividadEconomica')?.updateValueAndValidity();
    });
  }

  onUpload(event: any) {
    console.log('Archivos subidos:', event.files);
  }

  enviarSolicitud(): void {
    if (this.solicitudForm.valid) {
      this.mostrarDialogo = true;
    } else {
      console.error('El formulario no es válido. Por favor, complete todos los campos requeridos.');
      this.solicitudForm.markAllAsTouched();
    }
  }

  generarPDF(): void {
  const data = this.solicitudForm.value;
  const doc = new jsPDF();
  const tipo = data.tipo === 'trabajador' ? 'Trabajador' : 'Empresa';
  
  // Título y Subtítulo
  doc.setFontSize(18);
  doc.text(`SOLICITUD DE BAJA DE ${tipo.toUpperCase()}`, 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text('Datos de la Solicitud', 10, 35);

  const tableData: any[][] = [
    ['Tipo de Solicitud', tipo],
    ['Fecha de Solicitud', data.fechaSolicitud],
    ['Nombre / Razón Social', data.nombre],
    ['C.I. / NIT', data.ci_nit],
    ['Teléfono de Contacto', data.telefonoContacto],
    ['Correo de Contacto', data.correoContacto]
  ];

  if (data.tipo === 'trabajador') {
    tableData.push(
      ['Cargo / Puesto', data.cargo],
      ['Área / Departamento', data.areaDepartamento],
      ['Fecha de Ingreso', data.fechaIngreso],
      ['Fecha de Baja', data.fechaBaja],
      ['Tipo de Baja', data.tipoBaja]
    );
  } else {
    tableData.push(
      ['Actividad Económica', data.actividadEconomica],
      ['Número de Registro Patronal', data.numeroRegistroPatronal],
      ['Representante Legal', data.representanteLegal],
      ['C.I. Representante', data.ciRepresentante],
      ['Dirección de la Empresa', data.direccionEmpresa],
      ['Fecha de Cese de Actividades', data.fechaCeseActividades]
    );
  }

  // Llamada a la función autoTable con la instancia de jsPDF
  autoTable(doc, {
    startY: 40,
    head: [['Campo', 'Valor']],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: '#2c3e50',
      textColor: '#ffffff',
      fontStyle: 'bold'
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY;

  // Sección de Motivos y Observaciones
  doc.setFontSize(12);
  doc.text('Motivo de la Solicitud', 10, finalY + 10);
  const splitMotivo = doc.splitTextToSize(data.motivo, 180);
  doc.text(splitMotivo, 10, finalY + 15);

  const motivoY = finalY + 15 + (splitMotivo.length * 5);
  doc.text('Observaciones Adicionales', 10, motivoY + 10);
  const splitObs = doc.splitTextToSize(data.observaciones, 180);
  doc.text(splitObs, 10, motivoY + 15);

  // Firmas
  const firmasY = Math.max(motivoY + 15 + (splitObs.length * 5), doc.internal.pageSize.height - 50);
  doc.text('Atentamente,', 10, firmasY);
  doc.text('__________________________________', 10, firmasY + 10);
  doc.text(`${tipo.toLowerCase() === 'trabajador' ? 'Firma del Trabajador' : 'Firma y Sello de la Empresa'}`, 10, firmasY + 15);

  doc.save(`solicitud_baja_${tipo}.pdf`);
  this.mostrarDialogo = false;
}
}