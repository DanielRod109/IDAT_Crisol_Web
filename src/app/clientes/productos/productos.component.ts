import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  subgenero: string | null;
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private tiendaService:TiendaService,
     private productoService:ProductosService,
     private route: ActivatedRoute){}

     ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.subgenero = params['subgenero'];
        if (this.subgenero && this.subgenero.trim().length > 0) {  // Asegúrate de que el subgénero no está vacío
          this.productoService.buscarLibroporSubgenero(this.subgenero).subscribe(
            productos => this.productos = productos,
            error => console.error('Error al buscar libro por subgénero.')
          );
        } else {
          this.getProductos();
        }
      });
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

    
  buscarLibroporSubgenero(subgenero: string){
    this.productoService.buscarLibroporSubgenero(subgenero).subscribe(
      productos => {this.productos = productos},
      error => {console.error('Error al buscar libro por subgenero.')}
  )
    

}
}
