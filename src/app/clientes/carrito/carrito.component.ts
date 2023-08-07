import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/servicios/carrito-libros/message.service';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Productos } from 'src/app/clases/producto';
import { ItemsCarrito } from 'src/app/clases/items-carrito';
import { environment } from 'src/app/clases/paypal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  /*
  cartItems:any[] = [];
  total = 0;
  */
  constructor(
    private tiendaService: TiendaService,
    private router: Router
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
