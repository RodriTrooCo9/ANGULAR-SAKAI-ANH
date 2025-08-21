// src/app/interfaces/custom-menu-item.interface.ts

import { MenuItem } from 'primeng/api';

// Extiende la interfaz MenuItem para incluir la propiedad 'roles'
export interface CustomMenuItem extends MenuItem {
  roles?: string[]; // La propiedad 'roles' es opcional y es un array de strings
}