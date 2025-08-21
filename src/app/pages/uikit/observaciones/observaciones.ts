// src/app/componentes/observaciones/observaciones.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-observaciones',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    PanelModule,
    MessageModule
  ],
  templateUrl: './observaciones.html',
  styleUrls: ['./observaciones.scss']
})
export class Observaciones implements OnInit {
  
  @Input() tipoFormulario: 'empresa' | 'trabajador' = 'trabajador';
  @Input() observaciones: string[] = [];
  @Input() datosFormulario: any = {};
  
  sinObservaciones: boolean = true;
  documentosAceptados: string[] = []; // Array para los documentos aceptados

  constructor() {}

  ngOnInit(): void {
    // Verificamos si el array de observaciones está vacío
    this.sinObservaciones = this.observaciones.length === 0;

    if (this.sinObservaciones) {
      // Aquí puedes simular qué documentos fueron aceptados
      // En un caso real, esta información vendría del backend
      this.documentosAceptados = [
        'Formulario de datos personales',
        'Copia de Carnet de Identidad',
        'Foto de perfil',
        // 'Título profesional' (si aplica)
      ];
    }
  }

  volverAFormulario() {
    // Lógica para volver al formulario
    console.log('Volviendo al formulario...');
    // Emitir evento, redireccionar, etc.
  }
}