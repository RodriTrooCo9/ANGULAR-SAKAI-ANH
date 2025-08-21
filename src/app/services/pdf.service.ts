import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormularioPostulacion } from '../models/formulario.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = 'YOUR_BACKEND_API_URL/pdf-generator'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  generarPdfFormulario(formulario: FormularioPostulacion): Observable<Blob> {
    // This assumes your backend has an endpoint that accepts a form object
    // and returns a PDF file as a Blob.
    return this.http.post(this.apiUrl, formulario, {
      responseType: 'blob'
    });
  }
}