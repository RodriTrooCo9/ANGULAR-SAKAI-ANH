// src/app/curriculum-empresa/curriculum-empresa.component.ts
import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../../services/data-sharing.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-curriculum-empresa',
  standalone: true,
  imports:[ CommonModule],
  templateUrl: './curriculum-empresa.html',
  styleUrls: ['./curriculum-empresa.scss']
})
export class CurriculumEmpresa implements OnInit {

  empresaData: any;

  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.dataSharingService.empresaData$.subscribe(data => {
      if (data) {
        this.empresaData = data;
        console.log('Datos de la empresa recibidos:', this.empresaData);
      }
    });
  }
}