import { Component, Input, OnInit } from '@angular/core';
import { Productos } from 'src/app/clases/producto';
import { MessageService } from 'src/app/servicios/carrito-libros/message.service';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  @Input() productoCarrito : Productos;

  productos: Productos[] = [];

  
  constructor(private tiendaService:TiendaService, private messageService:MessageService){}

  ngOnInit(): void{
    this.getProductos();
  }

  getProductos(){
    this.tiendaService.obtenerProductos().subscribe((data) =>{
      return this.productos = data;
    })


  }
  /*
  addToCart(product: Productos) {
    this.tiendaService.añadirProducto(product)
  }*/

  addToCart(): void {
    console.log("Mensaje Funcionando")
    this.messageService.sendMessage(this.productoCarrito);
  }
}
