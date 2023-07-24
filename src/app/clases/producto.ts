
import { Subgenero } from "./subgnero";

export class Productos {
    id_libro:number;
    nombre:string;
    peso:number;
    editorial:string;
    nombre_autor:string;
    alto:number;
    ancho:number;
    stock:number;
    precio:number;
    aedicion:string;
    npaginas:number;
    img:string
    subgenero: Subgenero;
}
