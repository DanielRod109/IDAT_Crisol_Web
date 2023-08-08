import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Vental } from 'src/app/clases/ventaL';
import { VentasService } from 'src/app/servicios/api-ventas/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas-curso',
  templateUrl: './ventas-curso.component.html',
  styleUrls: ['./ventas-curso.component.css']
})
export class VentasCursoComponent {

  ventas: Vental[];

  constructor(private ventaService:VentasService,
    private location:Location){}
  

  ngOnInit(): void{
    this.getVentas();
  }
  getVentas(){
    this.ventaService.obtenerVentasConfirmar().subscribe((data) =>{
      return this.ventas = data;
    })
  }

  confirmarVenta(id: number): void {
    Swal.fire({
      title: 'Confirmar venta',
      text: "Verifica que la venta entregada es correcta!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaService.confirmarVenta(id).subscribe(
          (venta) => {
            Swal.fire(
              'Venta confirmada!',
              'La venta ha sido entregada.',
              'success'
            );
            this.getVentas();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
  

}
