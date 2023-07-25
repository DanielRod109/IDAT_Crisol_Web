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


  irDatosEntrega(){
    this.router.navigate(['crisol/datos-entrega'])
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
  
  //NUEVO CARRITO
  /*
  getItem(): void {
    
    this.messageService.getMessage().subscribe((product: Productos) => {
      let exists = false;
      this.cartItems.forEach(item => {
        if (item.id_libro === product.id_libro) {
          exists = true;
          item.cantidad++;
        }
      });
      if (!exists) {
        const cartItem = new ItemsCarrito(product);
        this.cartItems.push(cartItem);
      }
      this.total = this.getTotal();
      this.tiendaService.setCart(this.cartItems);
    });
    

    this.messageService.getMessage().subscribe((product: Productos) => {
      const cartItem = new ItemsCarrito(product);
      this.cartItems.push(cartItem);
    });
  }
  */
/*
    getTotal(): number {
      let total = 0;
      this.myCart$.subscribe((p: Productos[]) => {
      p.forEach(item => {
        total += item.stock * item.precio;
      });
    });
      return +total.toFixed(2);
    }
*/
  /*
  getItemsList(): any[] {
    const items: any[] = [];
    let item = {};
    this.myCart$.forEach((it: Productos) => {
      item = {
        name: it.nombreproducto,
        quantity: it.cantidad,
        unit_amount: {value: it.precio_uni, currency_code: 'USD'}
      };
      items.push(item);
    });
    return items;
  }
  */


/*
  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.cantidad * item.precio_uni;
    });
    return +total.toFixed(2);
  }



  deleteItem(i: number): void {
    if (this.cartItems[i].cantidad > 1) {
      this.cartItems[i].cantidad--;
    } else {
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.tiendaService.setCart(this.cartItems);
  }
  */

  /*
  //PAYPAL
    private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.clientId,
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.getTotal().toString()
              }
            }
          },
          items: this.getItemsList()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        //this.spinner.show();
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
        JSON.stringify(data));
        this.emptyCart();
        //this.spinner.hide();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }*/
}
