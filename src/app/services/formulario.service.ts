// src/app/service/formulario.service.ts
import { Injectable } from '@angular/core';
import { FormularioPostulacion } from '../models/formulario.model';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private formularios: FormularioPostulacion[] = [];
  private formulariosSubject = new BehaviorSubject<FormularioPostulacion[]>(this.formularios);

  constructor() { }

  getFormularios(): Observable<FormularioPostulacion[]> {
    return this.formulariosSubject.asObservable();
  }

  // Agrega un método para obtener solo los pendientes
  getFormulariosPendientes(): Observable<FormularioPostulacion[]> {
    return this.formulariosSubject.asObservable().pipe(
      map(forms => forms.filter(f => f.status === 'pendiente'))
    );
  }

  getFormularioById(id: string): Observable<FormularioPostulacion | undefined> {
    const formulario = this.formularios.find(f => f.id === id);
    return of(formulario);
  }

  submitFormulario(formulario: FormularioPostulacion): Observable<FormularioPostulacion> {
    // Genera un ID, establece el estado y lo agrega a la lista
    formulario.id = `form-${Date.now()}`;
    formulario.status = 'pendiente';
    
    // Simula una llamada a la API
    const nuevoFormulario = { ...formulario }; 
    this.formularios.push(nuevoFormulario);
    
    // Notifica a los suscriptores sobre la nueva lista
    this.formulariosSubject.next(this.formularios); 
    
    console.log('Formulario enviado:', nuevoFormulario);
    return of(nuevoFormulario);
  }

  updateFormularioStatus(id: string, newStatus: 'aprobado' | 'rechazado'): Observable<void> {
    const formulario = this.formularios.find(f => f.id === id);
    if (formulario) {
      formulario.status = newStatus;
      this.formulariosSubject.next(this.formularios);
      console.log(`Formulario ${id} ha sido ${newStatus}`);
    }
    return of(void 0);
  }
}