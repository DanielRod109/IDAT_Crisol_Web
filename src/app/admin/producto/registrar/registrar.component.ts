import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/clases/producto';
import { ProductosService } from 'src/app/servicios/api-productos/productos.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  productos: Productos = new Productos();

  constructor(private productoService:ProductosService, private router:Router){
  }

  guardarProducto(){
    this.productoService.registrarProductos(this.productos).subscribe(dato =>{
      console.log(dato);
    },error => console.log(error));
  }

  irAListado(){
    this.router.navigate(['crisol/admin/producto']);
  }

  onSubmit(){
    this.guardarProducto();
    this.irAListado();
  }

  validarNumerico(event: KeyboardEvent) {
    const key = event.key;
    const isNumber = /^[0-9.]$/.test(key); // Modificado: permite números y el punto decimal
    const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(key);
  
    if (!isNumber && !isBackspaceOrDelete) {
      event.preventDefault();
    }
  }

  
validarNum(event: KeyboardEvent) {
  const key = event.key;
  const isNumber = /^[0-9]$/.test(key);
  const isBackspaceOrDelete = ['Backspace', 'Delete'].includes(key);
  
  if (!isNumber && !isBackspaceOrDelete) {
    event.preventDefault();
  }
}


}
