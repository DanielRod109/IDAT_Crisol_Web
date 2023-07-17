import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/api-usuarios/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  rolUsuario: string | null = null;

  nombres: string | null = null;
  
  selectedOption: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router){}


//Login usuario
onLogin() {
  this.usuarioService.login();
}


onLogout() {
  this.usuarioService.logout();
}

isAuthenticated(): boolean {
  return this.usuarioService.isAuthenticated();
}

//----
ngOnInit(): void {
  if (this.usuarioService.isAuthenticated()) {
    this.rolUsuario = this.usuarioService.getRolUsuario();
    this.nombres = this.usuarioService.getNombreTrabajador();
  }
}

selectOption(option: string): void {
  this.selectedOption = option;
  this.router.navigateByUrl(option);
}

isSelected(option: string): boolean {
  return this.selectedOption === option;
}

}
