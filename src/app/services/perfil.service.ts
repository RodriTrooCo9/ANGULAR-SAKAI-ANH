import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../models/perfil-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  // Subject para emitir los datos del usuario
  private usuarioSource = new Subject<Usuario>();

  // Observable que los componentes pueden suscribir
  usuarioActualizado$ = this.usuarioSource.asObservable();

  constructor() { }

  // Método para actualizar y emitir los datos del usuario
  actualizarUsuario(usuario: Usuario) {
    this.usuarioSource.next(usuario);
  }
}