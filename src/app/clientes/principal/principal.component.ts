import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/clases/producto';
import { TiendaService } from 'src/app/servicios/carrito-libros/tienda.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  //Carrito de Compras

  productos:Productos[]=[];
  constructor(private tiendaService:TiendaService){}

  ngOnInit(): void{
    this.tiendaService.obtenerProductos().subscribe((data)=>{
      this.productos = data;
    })
  }

}
