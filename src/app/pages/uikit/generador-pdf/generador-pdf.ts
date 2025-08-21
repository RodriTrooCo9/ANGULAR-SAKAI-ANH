import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Importa los modelos y servicios necesarios
import { FormularioPostulacion } from '../../../models/formulario.model';
import { FormularioService } from '../../../services/formulario.service';

import { PdfService } from '../../../services/pdf.service'; // NEW SERVICE

// NEW Pipe for sanitizing URLs
@Pipe({ name: 'safeUrl', standalone: true })
export class SafeUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url: string | null): SafeResourceUrl | null {
        return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
    }
}

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
    SafeUrlPipe
  ],

  templateUrl: './generador-pdf.html',
  styleUrls: ['./generador-pdf.scss']
})
export class GeneradorPDF implements OnInit {
  formularios: FormularioPostulacion[] = [];
  formularioSeleccionado: FormularioPostulacion | null = null;
  displayDialogRevisar = false;
  displayDialogPdf = false; // New property for PDF dialog
  pdfUrl: string | null = null; // New property to store the PDF URL

  aprobacionDatosEmpresa = false;
  aprobacionReferencias = false;
  aprobacionEmpleados = false;
  aprobacionExperiencia = false;

  constructor(private formularioService: FormularioService, private pdfService: PdfService) {}

  ngOnInit(): void {
    this.formularios = [
      {
        id: '1',
        empresa: {
          id: 'e1',
          nombre: 'Empresa A',
          iniciales: 'EA',
          email: 'empresa@gmail.com',
          telefono: 123,
          nit: 'nit1234',
          pdfNit: undefined,
          logoUrl: 'assets/demo/images/product/galaxy-earbuds.jpg',
          tipoRed: 'empresarial',
          fechaExpiracion: new Date('2028-01-01')
        },
        referencia: new Object() as any,
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
          logoUrl: 'assets/demo/images/product/bamboo-watch.jpg',
          tipoRed: 'domestica',
          fechaExpiracion: new Date('2028-01-01')
        },
        referencia: new Object() as any,
        empleados: [],
        //experiencias: [],
        pdfDatosEmpresa: undefined,
        status: 'pendiente',
        fotoEmpresa: undefined
      }
 
    ];
  }

  revisarFormulario(formulario: FormularioPostulacion) {
    this.formularioSeleccionado = formulario;
    this.aprobacionDatosEmpresa = false;
    this.aprobacionReferencias = false;
    this.aprobacionEmpleados = false;
    this.aprobacionExperiencia = false;
    this.displayDialogRevisar = true;
  }

  aprobarFormulario() {
    if (this.formularioSeleccionado) {
      this.formularioSeleccionado.status = 'aprobado';
      console.log('Formulario aprobado:', this.formularioSeleccionado.id);
      // Hide dialog but keep selected form to allow PDF generation
      this.displayDialogRevisar = false; 
    }
  }

  rechazarFormulario() {
    if (this.formularioSeleccionado) {
      this.formularioSeleccionado.status = 'rechazado';
      console.log('Formulario rechazado:', this.formularioSeleccionado.id);
      this.displayDialogRevisar = false;
      this.formularioSeleccionado = null;
    }
  }

  cerrarDialogo() {
    this.displayDialogRevisar = false;
    this.formularioSeleccionado = null;
  }
    
  generarPdf() {
      if (this.formularioSeleccionado) {
          this.pdfService.generarPdfFormulario(this.formularioSeleccionado).subscribe(pdfBlob => {
              const url = URL.createObjectURL(pdfBlob);
              this.pdfUrl = url;
              this.displayDialogPdf = true;
          });
      }
  }

  descargarPdf() {
      if (this.pdfUrl && this.formularioSeleccionado) {
          const a = document.createElement('a');
          a.href = this.pdfUrl;
          a.download = `Formulario_${this.formularioSeleccionado.id}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
  }
}