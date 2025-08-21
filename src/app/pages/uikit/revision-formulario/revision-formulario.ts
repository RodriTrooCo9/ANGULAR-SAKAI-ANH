// src/app/pages/uikit/generador-pdf/generador-pdf.ts

import { Component, Input, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-generador-pdf',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <p-button label="Generar PDF" (click)="generarPDF()" [disabled]="!contentToExport"></p-button>
  `
})
export class RevisiónFormulario {

  // Solución 1: Inicializa la propiedad con 'undefined'
  // Y usa el operador '!' para decirle a TypeScript que será asignada
  @Input() contentToExport!: ElementRef; 
  
  // O, si prefieres, simplemente usa '!'
  // @Input() contentToExport!: ElementRef; 

  @Input() filename: string = 'documento.pdf';

  constructor() {}

  generarPDF(): void {
    // La comprobación de 'if (!this.contentToExport)' sigue siendo importante
    // para manejar casos donde el Input no se ha pasado
    if (!this.contentToExport) {
      console.error('El elemento a exportar no ha sido proporcionado.');
      return;
    }

    const data = this.contentToExport.nativeElement;

    html2canvas(data).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 1, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 1, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(this.filename);
    }).catch(error => {
      console.error('Error al generar el PDF:', error);
    });
  }
}