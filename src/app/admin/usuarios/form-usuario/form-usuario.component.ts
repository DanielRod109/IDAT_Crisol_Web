import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/clases/rol';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/api-usuarios/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  roles: Rol[]; // Variable para almacenar los roles
  seleccionRol: number; // Cambiado a tipo number
  public usuario: Usuario = new Usuario();
  public todosLosCamposCompletos: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  cargarUsuarios(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.usuarioService.buscarUsuario(id).subscribe(
          (usuario) => {
            this.usuario = usuario;
            this.seleccionRol = usuario.rol?.rolId || 0; // Asignar el ID del rol seleccionado o 0 si es nulo
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  cargarRoles(): void {
    this.usuarioService.listarRoles().subscribe(
      (response: Rol[]) => {
        this.roles = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  validarCampos(): boolean {
    if(!this.usuario.dni || this.usuario.dni.trim() === '') {
        return false;
    }
    if(!this.usuario.nombre_trabajador || this.usuario.nombre_trabajador.trim() === '') {
        return false;
    }
    if(!this.usuario.telefono || this.usuario.telefono.trim() === '') {
        return false;
    }
    if(!this.usuario.email || this.usuario.email.trim() === '' ) {
        return false;
    }
    if(!this.usuario.password || this.usuario.password.trim() === '' ) {
        return false;
    }
    if(!this.seleccionRol || this.seleccionRol === 0) {
        return false;
    }
    if(this.usuario.usuarioId && (!this.usuario.estado || this.usuario.estado.trim() === '')) {
        return false;
    }
    return true;
}

  public crearUsuario(): void {
    if(this.validarCampos()) {
    this.usuarioService
      .crearUsuario(this.usuario, this.seleccionRol)
      .subscribe(
        (usuario) => {
          this.router.navigate(['/admin/principal/usuarios']);
          swal.fire(
            'Éxito!',
            'Usuario creado correctamente',
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

  public editarUsuario(): void {
    if(this.validarCampos()) {
    this.usuarioService
      .editarUsuario(this.usuario, this.seleccionRol)
      .subscribe(
        (usuario) => {
          this.router.navigate(['/admin/principal/usuarios']);
          swal.fire(
            'Éxito!',
            'Usuario actualizado correctamente',
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

  emailValido(): boolean {
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(this.usuario.email);
  }

}