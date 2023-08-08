import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { DetalleVenta } from 'src/app/clases/detalle-venta';
import { environment } from 'src/app/clases/paypal';
import { Productos } from 'src/app/clases/producto';
import { Venta } from 'src/app/clases/venta';
import { VentaDto } from 'src/app/clases/ventadto';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import { VentasService } from 'src/app/servicios/api-ventas/ventas.service';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';


@Component({
  selector: 'app-datos-entrega',
  templateUrl: './datos-entrega.component.html',
  styleUrls: ['./datos-entrega.component.css']
})
export class DatosEntregaComponent implements OnInit {

  entregaADomicilio: string;

  bloquearCampos: boolean = false;

  direccion: string = '';
  telefono: string = '';

  clienteIdRegistro: number | null = null;;

  public payPalConfig?: IPayPalConfig;

  carrito: Productos[] = [];

  myCart$ = this.tiendaService.myCart$;
  constructor(
    private tiendaService: TiendaService,
    private router: Router,
    private ventaService: VentasService,
    private clienteService:ClienteServiceService
  ) { }
  




  opcionEnvioCambiada() {
    console.log('Opción de envío cambiada:', this.entregaADomicilio);
    if(this.entregaADomicilio == "true"){
      this.bloquearCampos = false;
      console.log("Entrega a domicilio")
    }else{
      console.log("Recojo en tienda");
      this.direccion = '';
      this.telefono = '';
      this.bloquearCampos = true;
    }

  }


  RegistrarVenta(): void {
    const carritoProductos = this.tiendaService.getCart();
  
    // Array para almacenar los detalles de venta
    const detallesVenta: DetalleVenta[] = [];
  
    // Recorre el array de productos del carrito y crea los detalles de venta
    carritoProductos.forEach(producto => {
      const detalleVenta: DetalleVenta = {
        cantidad: producto.stock,
        precio_uni: producto.precio,
        subtotal: producto.stock * producto.precio,
        libro2: {
          id_libro: producto.id_libro
        }
      };
      detallesVenta.push(detalleVenta);
    });
  
    // Datos de la venta
    const venta: Venta = {
      total: this.tiendaService.totalCart(),
      cantidad_total: carritoProductos.length,
      direccion: this.direccion,
      tipo: true,
      cliente: {
        clienteId: this.clienteIdRegistro
      },
      usuario: {
        usuarioId: 1
      },
      motorizado: {
        motorizadoId: 1
      }
    };
  
    //const ventaEnviar: Venta = {...venta};

    // Crear el objeto VentaDto y asignar los datos de venta y detalles de venta
    const ventaDto: VentaDto = {
      venta: venta,
      detalles: detallesVenta
    };

    // Llamar al servicio de registro de ventas para enviar los datos al servidor
    
    this.ventaService.registrarVenta(ventaDto).subscribe(
      response => {
        console.log('Venta registrada con éxito:', response);
        // Limpia el carrito después de realizar la venta (opcional)
        //this.tiendaService.clear();
      },
      error => {
        console.error('Error al registrar la venta:', error);
      }
    );
  }



  emptyCart(): void {
    this.tiendaService.clear();
  }

  ngOnInit() {
    this.initConfig();
    this.clienteIdRegistro= this.clienteService.getClienteId();
    console.log(this.clienteIdRegistro); 
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
            purchase_units: [{ //venta
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
              items: this.getItemsList() //detalle venta
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
            this.RegistrarVenta();
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
