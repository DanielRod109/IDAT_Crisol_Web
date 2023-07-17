import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from 'src/app/clases/LoginInterface';
import { UsuarioService } from 'src/app/servicios/api-usuarios/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit  {
  loginForm! : FormGroup;

  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private api:UsuarioService , private router: Router){}

  ngOnInit(): void {
      if (this.api.isAuthenticated()) {
          this.router.navigate(['admin/principal']);
      }
      this.loginForm= new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      });
    }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public validarLogin(): void {
    if (this.loginForm.invalid) {
      // Marcar los campos inválidos como tocados para mostrar los mensajes de error
      this.loginForm.markAllAsTouched();
      return;
    }
  }


  onLogin(form: FormGroup) {
    const loginData: LoginInterface = {
      email:  this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.validarLogin();

    this.api.autenticar(loginData).subscribe(
      data => {
        console.log(data); // Verificar la respuesta del servidor
        if (data.message == "Inicio de sesión exitoso") {
          this.api.login();
          setTimeout(() => {
            this.router.navigate(['admin/principal']);
            swal.fire(
              '¡Bienvenido!',
              'Autenticado correctamente',
              'success'
            )
          }, 1500);
        }
      },
      error => {
        this.validarLogin();
        if (error.error.message == "Complete los campos correctamente.") {
          this.errorStatus = true;
          this.errorMsj = error.error.message;
        }
        if (error.error.message == "El email ingresado no está asociado a una cuenta.") {
          swal.fire(
            'Error',
            'Email o contraseña incorrecta',
            'error'
          )
        }
        if (error.error.message == "La contraseña ingresada es incorrecta.") {
          swal.fire(
            'Error',
            'Email o contraseña incorrecta',
            'error'
          )
        }
        console.log(error.error.message); // Verificar el mensaje de error en la consola
      }
    );
  }

  onLogout() {
    this.api.logout();
  }

}
