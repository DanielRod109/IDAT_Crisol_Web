import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Motorizado } from 'src/app/clases/motorizado';
import { Vental } from 'src/app/clases/ventaL';
import { ApiMotorizadoService } from 'src/app/servicios/api-motorizado/api-motorizado.service';
import { VentasService } from 'src/app/servicios/api-ventas/ventas.service';

@Component({
  selector: 'app-elegir-motorizado',
  templateUrl: './elegir-motorizado.component.html',
  styleUrls: ['./elegir-motorizado.component.css']
})
export class ElegirMotorizadoComponent implements OnInit {

  motorizado : Motorizado[];
  selecccionMotorizado: number;
  public venta: Vental = new Vental()

  constructor(
    private ventaService:VentasService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private motorizadoService:ApiMotorizadoService){}



  ngOnInit(): void {
    this.cargarMotorizados();
    this.cargarVenta()
  }

  cargarMotorizados():void {
    this.motorizadoService.obtenerMotorizados().subscribe(
      (response: Motorizado[]) =>{
        this.motorizado = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarVenta(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];
      if (id) {
        this.ventaService.buscarVenta(id).subscribe(
          (venta) => {
            this.venta = venta;
            this.selecccionMotorizado= venta.motorizado?.motorizadoId || 0;           
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }


}
