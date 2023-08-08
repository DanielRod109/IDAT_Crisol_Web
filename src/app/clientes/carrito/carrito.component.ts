import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(
    private tiendaService: TiendaService,
  ) { }


  ngOnInit(): void {
  }

  myCart$ = this.tiendaService.myCart$;

  viewCart: boolean = false;

  totalProductos(precio: number, cantidad: number) {
    return precio * cantidad
  }
  eliminarProducto(id: number) {
    this.tiendaService.eliminarProducto(id);
  }
  actSumProducto(id:number){
    this.tiendaService.sumarCantidad(id);
  }

  actRestProducto(id:number){
    this.tiendaService.restarCantidad(id)
  }

  actUnidades(operacion: string, id: number) {
    const product = this.tiendaService.findPById(id)
    if (product) {
      if (operacion === 'minus' && product.stock > 0) {
        this.actRestProducto(id);
      }
      if (operacion === 'add') {
        this.actSumProducto(id);
      }
      if (product.stock === 0) {
        this.eliminarProducto(id);
      }
    }
  }  
  totalCart() {
    const r = this.tiendaService.totalCart();
    return r;
  }
  
}
