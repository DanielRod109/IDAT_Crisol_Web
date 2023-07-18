import { Component } from '@angular/core';
import { Rol } from 'src/app/clases/rol';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/api-usuarios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  usuarios: Usuario[]=[];
  roles: Rol[]; // Variable para almacenar los roles
  seleccionRol: number;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (usuarios)=>{
        this.usuarios=usuarios
      }
    );
  }

  delete(usuario: Usuario): void {
    Swal.fire({
      title: 'Está seguro?',
      text: "¿Seguro que desea eliminar al usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'

    }).then((result) => {

      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.usuarioId).subscribe(
          response=>{
            this.usuarios=this.usuarios.filter(user=> user!== usuario)
            Swal.fire(
              'Eliminado!',
              `El usuario se eliminó con éxito`,
              'success'
            )
          }
        )
      }
    })
}

obtenerNombreRol(nombreRol: string): string {
  const rol = this.roles.find((r) => r.nombre_rol === nombreRol);
  return rol ? rol.nombre_rol : '';
}

}
