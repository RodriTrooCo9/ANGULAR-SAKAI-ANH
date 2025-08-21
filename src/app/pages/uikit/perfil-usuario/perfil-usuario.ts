import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { Usuario } from '../../../models/perfil-usuario.model';
import { PerfilService } from '../../../services/perfil.service';



@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    ImageModule,
    PanelModule,
    TagModule,
    InputTextModule,
  
],
  templateUrl: './perfil-usuario.html',
  styleUrls: ['./perfil-usuario.scss']
})
export class PerfilUsuario implements OnInit {

  @Input() usuario!: Usuario;

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {

     this.perfilService.usuarioActualizado$.subscribe(nuevoUsuario => {
      this.usuario = nuevoUsuario;
    });
    // Si no se recibe un usuario, se puede inicializar con datos de ejemplo
    if (!this.usuario) {
      this.usuario = {
        id: '1',
        avatarUrl: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavaji.png',
        nombre: 'Andres',
        apellido: 'de la Barra',
        email: 'andres@gmail.com',
        telefono: '123-456-7890',
        fechaNacimiento: new Date('1990-05-20'),
        direccion: 'Calle Falsa 123, Ciudad',
        rol: 'Administrador',
        bio: 'Soy un desarrollador de software con experiencia en Angular y PrimeNG.',
        habilidades: ['Angular', 'TypeScript', 'HTML', 'CSS', 'PrimeNG'],
        edad: 33,
        ingresos: 50000,
        profesion: 'Software Developer'
      };
    }
  }

}