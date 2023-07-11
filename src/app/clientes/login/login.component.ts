import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import { LoginInterface } from 'src/app/clases/LoginInterface';
import { RespuestaInterface } from 'src/app/clases/RespuestaLoginInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;

  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private api: ClienteServiceService, private router: Router) { }

  ngOnInit(): void {
    if (this.api.isAuthenticated()) {
      this.router.navigate(['crisol']);
    }

    this.loginForm= new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(10)])
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

    this.api.loginCorreo(loginData).subscribe(
      data => {
        console.log(data); // Verificar la respuesta del servidor
        if (data.message == "Inicio de sesión exitoso") {
          this.api.login();
          setTimeout(() => {
            this.router.navigate(['crisol']);
          }, 2000);
        }
      },
      error => {
        this.validarLogin();
        if (error.error.message == "Complete los campos correctamente.") {
          this.errorStatus = true;
          this.errorMsj = error.error.message;
        }
        if (error.error.message == "El email ingresado no está asociado a una cuenta.") {
          this.errorStatus = true;
          this.errorMsj = error.error.message;
        }
        if (error.error.message == "La contraseña ingresada es incorrecta.") {
          this.errorStatus = true;
          this.errorMsj = error.error.message;
        }
        console.log(error.error.message); // Verificar el mensaje de error en la consola
      }
    );
  }

  onLogout() {
    this.api.logout();
    this.router.navigate(['login']);
  }
}
