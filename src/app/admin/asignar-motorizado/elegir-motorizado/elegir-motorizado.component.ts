import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/clases/cliente';
import { Motorizado } from 'src/app/clases/motorizado';
import { Vental } from 'src/app/clases/ventaL';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import { ApiMotorizadoService } from 'src/app/servicios/api-motorizado/api-motorizado.service';
import { VentasService } from 'src/app/servicios/api-ventas/ventas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-elegir-motorizado',
  templateUrl: './elegir-motorizado.component.html',
  styleUrls: ['./elegir-motorizado.component.css']
})
export class ElegirMotorizadoComponent implements OnInit {

  motorizado : Motorizado[];
  cliente: Cliente[];
  seleccionMotorizado: number;
  public venta: Vental = new Vental()

  constructor(
    private ventaService:VentasService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private motorizadoService:ApiMotorizadoService,
    private clienteService: ClienteServiceService){}



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

  cargarCliente():void {
    this.clienteService.listarCliente().subscribe(
      (response: Cliente[]) =>{
        this.cliente = response;
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
            this.seleccionMotorizado= venta.motorizado?.motorizadoId || 0;           
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  asignarVenta():void{
    this.ventaService.asignarVenta(this.venta,this.seleccionMotorizado).subscribe(
      (venta) => {
        this.router.navigate(['/admin/principal/asignar-motorizado']);
        swal.fire(
          'Éxito!',
          'Motorizado asignado correctamente',
          'success'
        )
      },
        (error) => {
          console.error(error);
        }
    );
  }


}
