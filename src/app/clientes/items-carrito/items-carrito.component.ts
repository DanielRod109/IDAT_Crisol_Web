import { Component, Input, OnInit } from '@angular/core';
import { ItemsCarrito } from 'src/app/clases/items-carrito';

@Component({
  selector: 'app-items-carrito',
  templateUrl: './items-carrito.component.html',
  styleUrls: ['./items-carrito.component.css']
})
export class ItemsCarritoComponent implements OnInit {

  @Input() cartItem: ItemsCarrito;
  constructor(){}

  ngOnInit():void{

  }

}
  
