import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/clases/producto';
import { Subgenero } from 'src/app/clases/subgnero';
import { ProductosService } from 'src/app/servicios/api-productos/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  subgenero : Subgenero[];
  seleccionSubgenero:number;
  id:number;
  producto:Productos = new Productos();
  constructor(private productoService:ProductosService,private router:Router,private route:ActivatedRoute){}

  ngOnInit():void{
    this.cargarSubgeneros();
    this.id = this.route.snapshot.params['id'];
    this.productoService.obtenerProducto(this.id).subscribe(dato =>{
      this.producto = dato;
    })
  }

  irAlListado(){
    this.router.navigate(['admin/principal/productos']);
  }

 /* editarProducto(){
    this.productoService.actualizarProductos(this.id,this.producto).subscribe(dato =>{
      
    })

  }*/

  cargarSubgeneros(): void {
    this.productoService.listarSubgeneros().subscribe(
      (response: Subgenero[]) => {
        this.subgenero = response;
      },
      (error) => {
        console.error(error);
      }
    );
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

  onSubmit(){
    //this.editarProducto();
    this.irAlListado();
  } 
}
