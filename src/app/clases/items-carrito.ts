import { Productos } from "./producto";
export class ItemsCarrito {

    idLibro:number;
    nombreproducto:string;
    cantidad:number; //qty
    precio_uni:number; //price
    
    constructor(producto: Productos){
        this.idLibro = producto.id_libro;
        this.nombreproducto = producto.nombre;
        this.precio_uni = producto.precio;
        this.cantidad = 1;

    }
}
