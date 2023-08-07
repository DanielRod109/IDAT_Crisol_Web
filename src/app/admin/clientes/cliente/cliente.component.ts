import { Component } from '@angular/core';
import { Cliente } from 'src/app/clases/cliente';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  cliente : Cliente[] = [];

  constructor(private clienteService:ClienteServiceService){}

  ngOnInit(): void{
    this.clienteService.listarCliente().subscribe(
      (clientes)=>{
        this.cliente = clientes
      }
    );
  }

  delete( cliente: Cliente): void {
    Swal.fire({
      title: 'Está seguro?',
      text: "¿Seguro que desea eliminar al cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'

    }).then((result) => {

      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(cliente.clienteId).subscribe(
          response=>{
            this.cliente=this.cliente.filter(cat=> cat!== cliente)
            Swal.fire(
              'Eliminado!',
              'Cliente eliminado correctamente.',
              'success'
            )
          }
        )
      }
    })
  }


}
