import { Component } from '@angular/core';
import { Productos } from 'src/app/clases/producto';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos: Productos[] = [];
  constructor(private tiendaService:TiendaService){}

  ngOnInit(): void{
    this.getProductos();
  }

  getProductos(){
    this.tiendaService.obtenerProductos().subscribe((data) =>{
      return this.productos = data;
    })
  }
  addToCart(product: Productos) {
    this.tiendaService.añadirProducto(product)
  }

}
