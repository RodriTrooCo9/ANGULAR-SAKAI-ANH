import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/perfil-usuario.model'; // ruta del modelo Usuario

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://tu-api.com/api/usuarios';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los usuarios
   */
  obtenerTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  /**
   * Obtiene un usuario por su ID
   */
  obtenerPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo usuario
   */
  crear(usuario: Omit<Usuario, 'id'>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  /**
   * Actualiza un usuario existente
   */
  actualizar(id: string, cambios: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, cambios);
  }

  /**
   * Elimina un usuario
   */
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}