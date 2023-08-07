import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/app/clases/paypal';
import { Productos } from 'src/app/clases/producto';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';


@Component({
  selector: 'app-datos-entrega',
  templateUrl: './datos-entrega.component.html',
  styleUrls: ['./datos-entrega.component.css']
})
export class DatosEntregaComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
 
  carrito: Productos[] = [];

  entregaADomicilio: boolean = true;

  direccion: string = '';

  telefono: string = '';

 


  myCart$ = this.tiendaService.myCart$;

  constructor(
    private tiendaService: TiendaService,
    private router: Router
  ) { }


  emptyCart(): void {
    this.tiendaService.clear();
  }


  ngOnInit() {
    this.initConfig();
  }

/*
  getItemsList(): any[] {
    this.carrito = this.tiendaService.getCart();
    const items: any[] = [];
    let item = {};

    this.carrito.forEach((it:Productos) =>{
      item = {
        name: it.nombre,
        quantity: it.stock,
        unit_amount: { value: it.precio, currency_code: 'USD' }
      };
      items.push(item);
    });
  }
  */

  limpiarFormulario() {

    if (!this.entregaADomicilio) {

      this.direccion = '';

      this.telefono = '';

    }

  }

  totalCart() {
    const r = this.tiendaService.totalCart();
    return r;
  }

  getItemsList(): any[] {
    const items: any[] = [];
    let item = {};
    this.myCart$.subscribe((productos: Productos[]) => {
      productos.forEach((it: Productos) => {
        item = {
          name: it.nombre,
          quantity: it.stock,
          unit_amount: { value: it.precio, currency_code: 'USD' }
        };
        items.push(item);
      });
    }); 
    return items;
  }

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
                value: this.totalCart().toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.totalCart().toString()
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
            this.router.navigate(['/'])
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
    }
}
