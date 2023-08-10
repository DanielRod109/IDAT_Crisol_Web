import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import { LoginInterface } from 'src/app/clases/LoginInterface';
import { RespuestaInterface } from 'src/app/clases/RespuestaLoginInterface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

    this.api.loginCorreo(loginData).subscribe(
      data => {
        console.log(data); // Verificar la respuesta del servidor
        if (data.message == "Inicio de sesión exitoso") {
          this.api.login();
          setTimeout(() => {
            this.router.navigate(['crisol']);
          }, 2000);
        }
        this.bienvenida();
      },
      error => {
        this.validarLogin();
        if (error.error.message == "Complete los campos correctamente.") {
          this.errorStatus = true;
          this.errorMsj = error.error.message;
        }
        if (error.error.message == "El email ingresado no está asociado a una cuenta.") {
          this.errorStatus = true;
          this.errorMsj = "Email o contraseña incorrecta";
        }
        if (error.error.message == "La contraseña ingresada es incorrecta.") {
          this.errorStatus = true;
          this.errorMsj = "Email o contraseña incorrecta";
        }
        console.log(error.error.message); // Verificar el mensaje de error en la consola
      }
    );
  }

  async bienvenida(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      background: '#a5dc86',
      iconColor: 'white',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      customClass: {
        title: 'white-title' // Utiliza la clase personalizada aquí para el título
      }
    });
    
    await Toast.fire({
      icon: 'success',
      title: 'Sesión iniciada correctamente.'
    });
  }

  onLogout() {
    this.api.logout();
    this.router.navigate(['login']);
  }
}
