import { Component } from '@angular/core';
import { Vental } from 'src/app/clases/ventaL';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import { VentasService } from 'src/app/servicios/api-ventas/ventas.service';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.css']
})
export class ListaCompraComponent {


  ventas: Vental[];

  clienteId: number | null = null;

  constructor(private ventaService:VentasService, private clienteService:ClienteServiceService){}





  ngOnInit(): void{
    if (this.clienteService.isAuthenticated()) {
      this.clienteId= this.clienteService.getClienteId();
    }
    this.getVentas();
  }

  getVentas(){
    this.ventaService.buscarVentaCliente(this.clienteId?? 0).subscribe((data) =>{
      return this.ventas = data;
    })
  }

  

}
