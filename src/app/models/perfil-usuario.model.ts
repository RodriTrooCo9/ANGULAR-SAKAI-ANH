export interface Usuario {
edad: any;
ingresos: any;
profesion: any;
    id: string;
    avatarUrl: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    fechaNacimiento: Date;
    direccion: string;
    rol: 'Administrador' | 'Revisor' | 'Normal' | string;
    bio: string;
    habilidades: string[];
}