import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/clases/producto';
import { Subgenero } from 'src/app/clases/subgnero';
import { ProductosService } from 'src/app/servicios/api-productos/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  productos: Productos[];

  constructor (private productoService:ProductosService){}

  ngOnInit(): void{
    this.getProductos();
  }

  getProductos(){
    this.productoService.obtenerProductos().subscribe((data) =>{
      return this.productos = data;
    });
  }
/*
  updateProductos(id:number){
    this.router.navigate(['admin/principal/editar-producto',id]);
  }

  irAlRegistro(){
    this.router.navigate(['admin/principal/registrar-producto']);
  }*/
}
