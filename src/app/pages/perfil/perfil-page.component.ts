import { Component, OnInit } from '@angular/core';

import { PerfilUsuario } from '../uikit/perfil-usuario/perfil-usuario';
import { PerfilUsuarioModel } from '../../models/perfil-usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [
    CommonModule,
    PerfilUsuario,
    
  ],
  template: `
    <div class="card">
      <app-perfil-usuario [usuario]="usuarioActual"></app-perfil-usuario>
    </div>
  `,
  styles: [`
    .card {
      padding: 2rem;
      background-color: var(--surface-card);
      border-radius: var(--border-radius);
    }
  `]
})
export class PerfilPage implements OnInit {

  usuarioActual!: PerfilUsuarioModel;

  constructor() { }

  ngOnInit(): void {
    // Simular la carga de datos del usuario
    this.usuarioActual = {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
      fechaNacimiento: new Date('1990-05-15'),
      telefono: '+591 77778888',
      direccion: 'Av. Principal #123, La Paz',
      rol: 'Administrador',
      avatarUrl: 'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyya.png',
      documentosAdjuntos: [
        { nombre: 'CV_JuanPerez.pdf', url: '...' }
      ],
      habilidades: ['Angular', 'TypeScript', 'Node.js', 'PrimeNG'],
      bio: 'Desarrollador full-stack apasionado por las nuevas tecnologías y el desarrollo de aplicaciones web eficientes.'
    };
  }
}