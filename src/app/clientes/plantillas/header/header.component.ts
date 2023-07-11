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

  myCart$ = this.tiendaService.myCart$;


  constructor(private clienteService: ClienteServiceService, private tiendaService:TiendaService) { }

  //Login Clientes
  onLogin() {
    this.clienteService.login();
  }

  onLogout() {
    this.clienteService.logout();
  }

  isAuthenticated(): boolean {
    return this.clienteService.isAuthenticated();
  }
  
  //----
  ngOnInit():void{}
  //Carrito
  onToggleCart() {
    this.viewCart = !this.viewCart
  };
}
