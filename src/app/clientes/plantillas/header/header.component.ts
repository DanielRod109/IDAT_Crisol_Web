import { Component, OnInit } from '@angular/core';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  viewCart: boolean = false;
  clienteNombre: string | null = null;
  showMenu: boolean = false;
  showSubMenu: boolean = false;


  myCart$ = this.tiendaService.myCart$;
  



  constructor(private clienteService: ClienteServiceService, private tiendaService:TiendaService) { }

  //Login Clientes
  onLogin() {
    this.clienteService.login();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleSubMenu() {
    if (this.showMenu) {
      this.showSubMenu = !this.showSubMenu;
    }
  }

  onLogout() {
    this.clienteService.logout();
  }

  isAuthenticated(): boolean {
    return this.clienteService.isAuthenticated();
  }
  
  //----
  ngOnInit(): void {
    if (this.clienteService.isAuthenticated()) {
      this.clienteNombre = this.clienteService.getClienteNombre();
    }
  }
  //Carrito
  onToggleCart() {
    this.viewCart = !this.viewCart;
  };
}
