// src/app/data-sharing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private empresaDataSubject = new BehaviorSubject<any>(null);
  empresaData$ = this.empresaDataSubject.asObservable();

  constructor() { }

  // Este método guardará los datos de la empresa
  setEmpresaData(data: any) {
    this.empresaDataSubject.next(data);
  }
}