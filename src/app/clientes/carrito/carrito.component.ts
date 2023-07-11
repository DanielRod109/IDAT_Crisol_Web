import { Component } from '@angular/core';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  
  myCart$ = this.tiendaService.myCart$;

  viewCart: boolean = false;

  constructor(private tiendaService:TiendaService){}

  totalProductos(precio:number, cantidad: number){
    return precio*cantidad
  }
  
  eliminarProducto(id: number){
    this.tiendaService.eliminarProducto(id);
  }

  actUnidades(operacion:string, id:number){
    const product = this.tiendaService.findPById(id)
    if(product){
      if(operacion === 'minus' && product.stock >0){
        product.stock = product.stock -1;
      }
      if(operacion === 'add'){
        product.stock = product.stock +1;
      }
      if(product.stock === 0){
        this.eliminarProducto(id);
      }
    }
  }
  totalCart(){
    const r = this.tiendaService.totalCart();
    return r;
  }

}
