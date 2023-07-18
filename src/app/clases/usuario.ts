import { Rol } from "./rol";


export class Usuario{
    usuarioId:number; 
    dni: string;
    email: string;
    estado: string;
    nombre_trabajador: string;
    password: string;
    telefono: string;
    rol: Rol;
}