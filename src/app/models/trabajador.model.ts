// src/app/models/trabajador.model.ts

export interface Trabajador {
 
  foto: File | undefined;
  nombresApellidos: string;
  fechaNacimiento: Date | undefined;
  nacionalidad: string;

  ciNumero: string;
  ciLugarEmision: string;
  ciFechaEmision: Date | undefined;
  ciFechaVencimiento: Date | undefined;
  
  nit: string;
  numeroCelular: string;
  numeroTelefonoFijo?: string; // Opcional
  direccionDomicilio: string;
  
  tieneTituloProfesional: boolean;
  archivoTituloProfesional: File | undefined; // Adjunto
  
  tipoContrato: string;
  fechaInicioContrato: Date | undefined;
  fechaFinalizacionContrato?: Date | undefined; // Opcional
  
  aprobacionAsesorLegal: boolean;
  numeroAutorizacionContrato?: string; // Opcional
}