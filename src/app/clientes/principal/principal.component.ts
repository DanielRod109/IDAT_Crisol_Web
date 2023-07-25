import { Component, HostListener, OnInit } from '@angular/core';
import { Productos } from 'src/app/clases/producto';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  lastScrollTop: number = 0;
  //Carrito de Compras

  productos:Productos[]=[];
  constructor(private tiendaService:TiendaService){}

  ngOnInit(): void{
    this.tiendaService.obtenerProductos().subscribe((data)=>{
      this.productos = data;
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > this.lastScrollTop) {
      // Cuando se hace scroll hacia abajo
      navbar?.classList.add('hidden');
    } else {
      // Cuando se hace scroll hacia arriba
      navbar?.classList.remove('hidden');
    }
    this.lastScrollTop = scrollTop;
  }
  
}
