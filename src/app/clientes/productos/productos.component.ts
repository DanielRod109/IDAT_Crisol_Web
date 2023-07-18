import { Component } from '@angular/core';
import { Productos } from 'src/app/clases/producto';
import { ProductosService } from 'src/app/servicios/api-productos/productos.service';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos: Productos[] = [];
  nombre: string = '';
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private tiendaService:TiendaService, private productoService:ProductosService){}

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

  
  buscarPorNombreAutorEditorial(nombre: string) {
    this.productoService.buscarPorNombreAutorEditorial(nombre).subscribe(
      data=> {
        this.errorStatus = false;
        this.productos = data;
       
      },
      error => {
        if (error.error.message == "Lo sentimos, no pudimos encontrar tu búsqueda.") {
          this.errorStatus = true;
          this.errorMsj = error.error.message;
        }
      }
    );
  }

}
