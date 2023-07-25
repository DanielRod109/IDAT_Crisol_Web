import { Component, Input, OnInit } from '@angular/core';
import { MenuData } from 'src/app/clases/menuData';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import { MenuService } from 'src/app/servicios/apis-menu/menu.service';
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
  


  categorias: any = {};
  menuData : any[] = [];
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  constructor(private clienteService: ClienteServiceService, 
    private tiendaService:TiendaService,
    private menuService: MenuService) { }

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
      
    this.menuService.obtenerDatosMenu().subscribe((data: MenuData[]) => {
      this.menuData = data;
      
      let groupedData: any = {};
  
      for (let data of this.menuData) {
        if (!groupedData[data.nombre_categoria]) {
          groupedData[data.nombre_categoria] = {
            nombre: data.nombre_categoria,
            generos: {}
          };
        }
  
        if (data.nombre_genero && !groupedData[data.nombre_categoria].generos[data.nombre_genero]) {
          groupedData[data.nombre_categoria].generos[data.nombre_genero] = {
            nombre: data.nombre_genero,
            subgeneros: []
          };
        }
  
        if (data.nombre_subgenero) {
          groupedData[data.nombre_categoria].generos[data.nombre_genero].subgeneros.push(data.nombre_subgenero);
        }
      }
    
      // Convierte el objeto en un array
      this.menuData = Object.values(groupedData).map((categoria: any) => {
        return {
          ...categoria,
          generos: Object.values(categoria.generos)
        };
      });
    });
  
    console.log(this.categorias);
  }

  //Carrito
  onToggleCart() {
    this.viewCart = !this.viewCart;
  };

  
}
