import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormularioPostulacion } from '../models/formulario.model'; // Ajusta la ruta

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {
  private apiUrl = 'https://tu-api.com/api/postulaciones';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las postulaciones
   */
  obtenerTodas(): Observable<FormularioPostulacion[]> {
    return this.http.get<FormularioPostulacion[]>(this.apiUrl);
  }

  /**
   * Obtiene una postulación por su ID
   */
  obtenerPorId(id: string): Observable<FormularioPostulacion> {
    return this.http.get<FormularioPostulacion>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva postulación
   * Al igual que con el trabajador, los archivos se envían con FormData.
   */
  crear(postulacion: FormularioPostulacion): Observable<FormularioPostulacion> {
    const formData = new FormData();
    
    // Convertimos los objetos a string JSON para enviarlos con el archivo
    formData.append('empresa', JSON.stringify(postulacion.empresa));
    formData.append('referencia', JSON.stringify(postulacion.referencia));
    formData.append('empleados', JSON.stringify(postulacion.empleados));
    formData.append('status', postulacion.status);

    // Adjuntamos los archivos
    if (postulacion.pdfDatosEmpresa) {
        formData.append('pdfDatosEmpresa', postulacion.pdfDatosEmpresa, postulacion.pdfDatosEmpresa.name);
    }
    if (postulacion.fotoEmpresa) {
        formData.append('fotoEmpresa', postulacion.fotoEmpresa, postulacion.fotoEmpresa.name);
    }

    return this.http.post<FormularioPostulacion>(this.apiUrl, formData);
  }
  
  /**
   * Actualiza el estado de una postulación (ej. aprobar o rechazar)
   */
  actualizarEstado(id: string, status: 'aprobado' | 'rechazado'): Observable<FormularioPostulacion> {
    const url = `${this.apiUrl}/${id}/estado`;
    return this.http.patch<FormularioPostulacion>(url, { status });
  }

  /**
   * Elimina una postulación
   */
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}