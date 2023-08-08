import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/clases/producto';
import { ClienteServiceService } from 'src/app/servicios/api-cliente/cliente-service.service';
import { ProductosService } from 'src/app/servicios/api-productos/productos.service';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Productos[] = [];
  nombre: string = '';
  subgenero: string | null;
  errorStatus: boolean = false;
  errorMsj: any = "";

  constructor(private tiendaService:TiendaService,
     private productoService:ProductosService,
     private route: ActivatedRoute,
     private clienteService:ClienteServiceService){}

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
  
  isAuthenticated(): boolean {
    return this.clienteService.isAuthenticated();
  }

  async addToCart(product: Productos) {

    if(this.isAuthenticated()){
    this.tiendaService.añadirProducto(product)

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      background: '#a5dc86',
      iconColor: 'white',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: false,
      customClass: {
        title: 'white-title' // Utiliza la clase personalizada aquí para el título
      }
    });
    
    await Toast.fire({
      icon: 'success',
      title: 'Producto agregado al carrito'
    });
  }else{
    Swal.fire(
      'Debe iniciar sesión',
      'Para continuar con su compra, por favor inicie sesión',
      'warning'
    )

  }
    
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
