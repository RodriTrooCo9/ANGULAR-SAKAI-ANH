import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador.model'; // Asegúrate que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  // Aquí debes usar la URL del proxy para desarrollo:
  private apiUrl = '/api/trabajadores';
  // O la URL de tu API si ya configuraste CORS:
  // private apiUrl = 'http://localhost:51234/api/trabajadores';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los trabajadores
   * @returns Observable<Trabajador[]>
   */
  obtenerTodos(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(this.apiUrl);
  }

  /**
   * Obtiene un trabajador por su ID
   * @param id - El ID del trabajador
   * @returns Observable<Trabajador>
   */
  obtenerPorId(id: string): Observable<Trabajador> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Trabajador>(url);
  }

  /**
   * Crea un nuevo trabajador.
   * La lógica de envío se ha ajustado para ser compatible con el backend de .NET.
   * @param trabajador - Los datos del trabajador
   * @returns Observable<any>
   */
  crear(trabajador: Trabajador): Observable<any> {
    const formData = new FormData();
    
    // 1. Clonamos el objeto para no modificar el original
    const trabajadorData = { ...trabajador };
    
    // 2. Eliminamos las propiedades de archivo del objeto JSON
    delete trabajadorData.foto;
    delete trabajadorData.archivoTituloProfesional;
    
    // 3. Añadimos los datos restantes como un string JSON. 
    // El nombre 'trabajadorData' debe coincidir con el que lees en el controlador de C#.
    formData.append('trabajadorData', JSON.stringify(trabajadorData));

    // 4. Añadimos los archivos (si existen)
    if (trabajador.foto) {
      formData.append('foto', trabajador.foto, trabajador.foto.name);
    }
    if (trabajador.archivoTituloProfesional) {
      formData.append('archivoTituloProfesional', trabajador.archivoTituloProfesional, trabajador.archivoTituloProfesional.name);
    }

    // 5. Enviamos el FormData
    return this.http.post(this.apiUrl, formData);
  }

  /**
   * Actualiza un trabajador existente
   * @param id - ID del trabajador a actualizar
   * @param trabajador - Datos para actualizar. Usamos 'any' para más flexibilidad.
   * @returns Observable<any>
   */
  actualizar(id: string, trabajador: Partial<Trabajador>): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    // Si actualizas archivos, necesitarás una lógica similar a la de 'crear()'
    return this.http.put(url, trabajador);
  }

  /**
   * Elimina un trabajador
   * @param id - ID del trabajador a eliminar
   * @returns Observable<void>
   */
  eliminar(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}