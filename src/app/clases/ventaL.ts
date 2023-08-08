import { Cliente } from "./cliente";
import { Motorizado } from "./motorizado";
import { Usuario } from "./usuario";

export class Vental {
    ventaId:number;
    total:number;
    cantidad_total:number;
    estado:string;
    fecha_venta:string;
    direccion:string;
    tipo:boolean;
    cliente:Cliente;
    usuario:Usuario;
    motorizado:Motorizado;
}
