import { DetalleVenta } from "./detalle-venta";
import { Venta } from "./venta";

export class VentaDto {
    venta:Venta;
    detalles:DetalleVenta[];
}