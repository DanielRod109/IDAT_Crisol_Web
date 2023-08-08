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
    console.log(this.clienteId);
  }

  getVentas(){
    if (this.clienteId !== null) {
      this.ventaService.buscarVentaCliente(this.clienteId).subscribe((data) =>{
        this.ventas = data;
      });
    } else {
      console.error('El clienteId es null');
    }
  }
  

  

}
