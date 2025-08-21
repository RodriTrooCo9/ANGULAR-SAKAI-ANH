// Define la interfaz para la experiencia de trabajo, usando un solo nombre
export interface ExperienciaTrabajo {
    id: string;
    puesto: string;
    descripcion: string;
    // Puedes añadir otros campos si es necesario
    // nombreEmpresa?: string;
    // numeroEmpresa?: string;
    // detalles?: string;
    // estado?: 'activo' | 'inactivo';
}

// Define la interfaz para los datos de la empresa
export interface DatosEmpresa {
    id: string;
    nombre: string;
    iniciales: string;
    email: string;
    telefono: number;
    nit: string;
    pdfNit: File | undefined;
    fechaExpiracion: Date;
    logoUrl?: string;
    tipoRed: 'empresarial' | 'domestica' | 'industrial' | string;
}

// Define la interfaz para la referencia de la empresa
export interface ReferenciaEmpresa {
    nombre: string;
    email: string;
}

// Define la interfaz para el personal (unificado 'Empleado' y 'Trabajador')
export interface Personal {
    id: string; // ID único del personal
    nombre: string; // Usamos 'nombre' en lugar de 'nombreCompleto'
    numeroCI: string;
    detallesEmpleado?: string;
    estado?: 'activo' | 'inactivo' | string; // Añade un estado
    numeroVigente?: string;

    // Campos relacionados con la renovación y experiencias, ahora en esta interfaz unificada
    experiencias: ExperienciaTrabajo[];
    renovacion: {
        ultimaRenovacion: Date;
        fechaExpiracion: Date; // Validación de 5 años
    };
}

// Define la interfaz principal de la postulación
export interface FormularioPostulacion {
    fotoEmpresa: any;
    id: string;
    empresa: DatosEmpresa;
    referencia: ReferenciaEmpresa;
    empleados: Personal[]; // Usamos la interfaz 'Personal'
    pdfDatosEmpresa: File | undefined;
    status: 'pendiente' | 'aprobado' | 'rechazado';
    //fotoEmpresa: File | undefined; // Nueva propiedad para la foto
}