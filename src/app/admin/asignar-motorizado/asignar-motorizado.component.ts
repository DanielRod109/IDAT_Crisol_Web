import { Component } from '@angular/core';
import { Vental } from 'src/app/clases/ventaL';
import { VentasService } from 'src/app/servicios/api-ventas/ventas.service';

@Component({
  selector: 'app-asignar-motorizado',
  templateUrl: './asignar-motorizado.component.html',
  styleUrls: ['./asignar-motorizado.component.css']
})
export class AsignarMotorizadoComponent {


  ventas: Vental[];

  constructor(private ventaService:VentasService){}
  

  ngOnInit(): void{
    this.getVentas();
  }

  getVentas(){
    this.ventaService.obtenerVentasPendientesDomicilio().subscribe((data) =>{
      return this.ventas = data;
    })
  }

}
