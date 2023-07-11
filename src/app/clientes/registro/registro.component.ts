import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/clases/cliente';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  registroForm!: FormGroup;

  errorStatus: boolean = false;
  errorMsj: any = "";
  
  constructor(
    private clienteService: ClienteServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.registroForm = new FormGroup({
      dni : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      nombres: new FormControl('', [Validators.required,  Validators.minLength(3)]),
      apellidos: new FormControl('',[ Validators.required, Validators.minLength(3) ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
      // Agrega aquí más campos y validadores según tus necesidades
    });
  }

  get nombres() {
    return this.registroForm.get('nombres');
  }
  
  get apellidos() {
    return this.registroForm.get('apellidos');
  }

  get dni() {
    return this.registroForm.get('dni');
  }

  get email() {
    return this.registroForm.get('email');
  }

  get password() {
    return this.registroForm.get('password');
  }

  validarNumerico(event: KeyboardEvent) {
    const key = event.key;
    const isNumber = /^[0-9]$/.test(key);
    const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(key);
    
    if (!isNumber && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

  public crearCliente(): void {
    if (this.registroForm.invalid) {
      // Marcar los campos inválidos como tocados para mostrar los mensajes de error
      this.registroForm.markAllAsTouched();
      return;
    }

     // Asignar los valores del formulario al objeto cliente
     this.cliente.dni = this.registroForm.value.dni;
     this.cliente.nombres = this.registroForm.value.nombres;
     this.cliente.apellidos = this.registroForm.value.apellidos;
     this.cliente.email = this.registroForm.value.email;
     this.cliente.password = this.registroForm.value.password;

    this.clienteService.createCliente(this.cliente)
      .subscribe(
        cliente => {
          this.router.navigate(['crisol/cliente/cuenta/login']);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se registró con éxito',
            showConfirmButton: false,
            timer: 2000
          });
        },
        error => {
          if (error?.error?.message === 'El email ya está registrado, inicie sesión.') {
            Swal.fire(
              'Inicie Sesión',
              'El email ya está registrado, inicie sesión',
              'info'
            );
            setTimeout(() => {
            this.router.navigate(['crisol/cliente/cuenta/login']);
            }, 1500);
          }
        }
      );
  }
}