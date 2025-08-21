// src/app/layout/component/app.menu.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// Importa CustomMenuItem en lugar de MenuItem
import { CustomMenuItem } from '../../interface/custom-menu-item.interface'; // Ajusta la ruta si es necesario
// NO NECESITAS IMPORTAR MenuItem de 'primeng/api' aquí si solo usas CustomMenuItem
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of model; let i = index">
      <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul>`,
})
export class AppMenu implements OnInit {
  // Cambia el tipo de model a CustomMenuItem[]
  model: CustomMenuItem[] = [];
  currentUserRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.userRole$.subscribe((role) => {
      this.currentUserRole = role;
      this.updateMenu();
    });
    this.updateMenu();
  }

  updateMenu() {
    // Define allMenuItems como CustomMenuItem[]
    const allMenuItems: CustomMenuItem[] = [
      // Botón que te lleva al inicio
      {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }],
        roles: ['Admin', 'Usuario', 'Desarrollador'],
      },
      {
        label: 'Perfil',
        items: [{label: 'Perfil de Usuario', icon: 'pi pi-fw pi-user', routerLink: ['/uikit/perfil-usuario']}],
        roles: ['Usuario', 'Admin', 'Desarrollador'],
      },
      { separator: true },

      {
        label: 'Instaladoras',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Personal',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/uikit/personal'],
            roles: ['Usuario', 'Desarrollador'],
          },
          {
            label: 'Curriculum Empresa',
            icon: 'pi pi-fw pi-car',
            routerLink: ['/uikit/curriculumEmpresa'],
            roles: ['Usuario', 'Desarrollador'],
          },
          {
            label: 'Solicitud',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/uikit/solicitud'],
            roles: ['Usuario', 'Desarrollador'],
          },
        ],
      },

      {separator: true},

      { label: 'registros y observaciones',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Formulario de Empresa',
            icon: 'pi pi-fw pi-building',
            routerLink: ['/uikit/formempresa'],
            roles: ['Usuario', 'Admin', 'Desarrollador'],
          },
          {
            label: 'Formulario de Trabajador',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: ['/uikit/formtrabajador'],
            roles: ['Usuario', 'Admin', 'Desarrollador'],
          },
          {
            label: 'Listado de Empresas',
            icon: 'pi pi-fw pi-building',
            routerLink: ['/uikit/bajaempresa'],
            roles: ['Admin', 'Desarrollador'],
          },
          {
            label: 'Baja Personal',
            icon: 'pi pi-fw pi-user-minus',
            routerLink: ['/uikit/bajapersonal'],
            roles: ['Admin', 'Desarrollador'],
          },
          {
            label: 'Observaciones',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/uikit/observaciones'],
            roles: ['Usuario', 'Admin', 'Desarrollador'],
          },   
        ],

      },

      {separator: true},

      // Sección de Registro o Adición (Roles específicos)
      {
        label: 'Gestión de Entidades',
        icon: 'pi pi-fw pi-folder-open',
        items: [
          {
            label: 'Certificado de Aprobación',
            icon: 'pi pi-fw pi-file-pdf',
            routerLink: ['/uikit/generador-pdf'],
            roles: ['Usuario', 'Desarrollador'],
          },
          {
            label: 'Revisión de Formulario',
            icon: 'pi pi-fw pi-check-circle',
            routerLink: ['/uikit/revision-formulario'],
            roles: [ 'Admin', 'Desarrollador'],

          },
          {
            label: 'Lista de Empresas',
            icon : 'pi pi-fw pi-list',
            routerLink: ['/uikit/listaempresa'],
            roles: ['Admin', 'Desarrollador'],
          },
          {
            label: 'Formularios Pendientes',
            icon : 'pi pi-fw pi-list',
            routerLink: ['/uikit/forms-pendientes'],
            roles: ['Admin', 'Desarrollador'],
          },
          {
            label: 'Renovar Formulario',
            icon: 'pi pi-fw pi-refresh',
            routerLink: ['/uikit/renovar-formulario'],
            roles: ['Usuario', 'Admin', 'Desarrollador'],
          }

        ],
      },

      { separator: true },

      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/pages'],
        roles: ['Desarrollador'],
        items: [
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/login'],
                roles: ['Desarrollador'],
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/auth/error'],
                roles: ['Desarrollador'],
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/auth/access'],
                roles: ['Desarrollador'],
              },
            ],
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/pages/crud'],
            roles: ['Desarrollador'],
          },
        ],
      },

      { separator: true },

      {
        label: 'Servicios Externos',
        icon: 'pi pi-fw pi-globe',
        items: [
          {
            label: 'ANH',
            icon: 'pi pi-fw pi-building',
            items: [
              { label: 'SIREIDRO', icon: 'pi pi-fw pi-cog', url: 'https://ppa3vrsger02p.anh.gob.bo:9343/H201Y7070D4/Sitio/Persona/wfAutenticacion.aspx' },
              { label: 'SIREI INSTALADORAS', icon: 'pi pi-fw pi-wrench', url: 'https://ppa1vrsatcop.anh.gob.bo:9143/a29992015/Sitio/Persona/wfAutenticacion.aspx' },
              { label: 'TALLERES', icon: 'pi pi-fw pi-car', url: 'https://ppa3vrsger02p.anh.gob.bo:9343/T201C8041R9/' },
              { label: 'TALLERES GLP', icon: 'pi pi-fw pi-gas', url: 'https://ppa3vrsger02p.anh.gob.bo:9343/G201E7081G1/Sitio/Persona/wfAutenticacion.aspx' },
              { label: 'SIREL', icon: 'pi pi-fw pi-user-edit', url: 'https://ppa3vrsger02p.anh.gob.bo:9343/G201D7122D8/Sitio/Persona/wfAutenticacion.aspx' },
              { label: 'PLATAFORMAS DE PAGO', icon: 'pi pi-fw pi-money-bill', url: 'https://ppb01vrspgls01p.anh.gob.bo/' },
            ],
            roles: ['Usuario', 'Admin', 'Desarrollador'],
          },
          {
            label: 'SOPORTE TECNICO ',
            icon: 'pi pi-fw pi-life-ring',
            items: [{ label: 'servicio tecnico', icon: 'pi pi-fw pi-desktop' }],
            roles: ['Usuario', 'Admin', 'Desarrollador'],
          },
          {
            label: 'CONTACTOS',
            icon: 'pi pi-fw pi-comments',
            items: [
              { label: 'TELEGRAM', icon: 'pi pi-fw pi-telegram', url: '' },
              { label: 'WHATSAPP', icon: 'pi pi-fw pi-whatsapp', url: '' },
              { label: 'YOUTUBE', icon: 'pi pi-fw pi-youtube', url: '' },
              { label: 'FACEBOOK', icon: 'pi pi-fw pi-facebook', url: '' },
              { label: 'TECNICO', icon: 'pi pi-fw pi-user', url: '' },
            ],
            roles: ['Usuario', 'Admin', 'Desarrollador'],
          },
        ],
      },

      { separator: true },

      {
        label: 'INTRANET',
        icon: 'pi pi-fw pi-lock-open',
        items: [
          { label: 'CORREO ELECTRONICO', icon: 'pi pi-fw pi-envelope', url: '' },
          { label: 'SOPORTE', icon: 'pi pi-fw pi-question-circle', url: '' },
          { label: 'SGDE', icon: 'pi pi-fw pi-file-excel', url: '' },
          { label: 'SISTEMA HYDRO ', icon: 'pi pi-fw pi-database', url: '' },
          { label: 'TELEFONO', icon: 'pi pi-fw pi-phone', url: '' },
        ],
        roles: ['Admin', 'Desarrollador', 'Usuario'],
      },
    ];

    this.model = this.filterMenuItems(allMenuItems, this.currentUserRole);
  }

  // Cambia el tipo de 'items' a CustomMenuItem[]
  private filterMenuItems(items: CustomMenuItem[], role: string | null): CustomMenuItem[] {
    if (!role) {
      return [];
    }

    return items.filter((item) => {
      // Esta línea ahora está bien porque TypeScript sabe que 'roles' puede existir
      const hasAccess = item.roles?.includes(role) ?? !item.roles;

      if (hasAccess && item.items) {
        // Recursivamente, también tipa item.items como CustomMenuItem[]
        item.items = this.filterMenuItems(item.items as CustomMenuItem[], role);
        return item.items.length > 0;
      }
      return hasAccess;
    });
  }
}