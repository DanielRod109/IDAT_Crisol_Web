import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/clases/cliente';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit{

  public cliente:Cliente = new Cliente();

  constructor(
    private clienteService : ClienteServiceService,
    private activedRoute : ActivatedRoute,
    private router : Router
  ){}


  ngOnInit(): void {
   this.cargarClientes();
  }

  cargarClientes():void{
    this.activedRoute.params.subscribe((params)=>{
    const id = +params['id'];

    if(id){
      this.clienteService.buscarCliente(id).subscribe(
        (cliente) => {
          this.cliente = cliente;
        },
        (error) => {
          console.error(error);
        }
        );
      }
    });
  }
  
  validarCampos(): boolean {
    if (!this.cliente.dni) return false;
    if (!this.cliente.nombres) return false;
    if (!this.cliente.apellidos) return false;
    if (!this.cliente.telefono) return false;
    if (!this.cliente.direccion) return false;
    if (!this.cliente.clienteId) {
      if (!this.cliente.email) return false;
      if (!this.cliente.password ) return false;
    }
    return true;
  }

  public crearCliente(): void {
    if(this.validarCampos()) {
    this.clienteService
      .createCliente(this.cliente)
      .subscribe(
        (cliente) => {
          this.router.navigate(['/admin/principal/clientes']);
          swal.fire(
            'Éxito!',
            'Cliente creado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
      }
      else{
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Datos incompletos'
        })
      }
  }

  public editarCliente(): void {
    if(this.validarCampos()) {
    this.clienteService
      .editarCliente(this.cliente)
      .subscribe(
        (cliente) => {
          this.router.navigate(['/admin/principal/clientes']);
          swal.fire(
            'Éxito!',
            'Cliente actualizado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    }
    else{
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Datos incompletos'
      })
    }
  }

  validarNumerico(event: KeyboardEvent) {
    const key = event.key;
    const isNumber = /^[0-9]$/.test(key);
    const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(key);
    
    if (!isNumber && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }
  

}
