import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/clases/producto';
import { ProductosService } from 'src/app/servicios/api-productos/productos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-producto-registrar-editar',
  templateUrl: './producto-registrar-editar.component.html',
  styleUrls: ['./producto-registrar-editar.component.css']
})
export class ProductoRegistrarEditarComponent implements OnInit {


  public producto: Productos = new Productos()
  constructor(private productoService: ProductosService, private activatedRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.cargarProductos()
  }


  cargarProductos(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.productoService.obtenerProducto(id).subscribe((producto) => this.producto = producto)
      }
    })
  }

  public createLibro(): void {
    this.productoService.registrarProductos(this.producto)
      .subscribe(
        producto => {
          this.router.navigate(['admin/principal'])
          swal.fire('Nuevo Libro', `Libro ${producto.nombre} creado.`, 'success')
        }
      );
  }

  updateLibro(): void {
    this.irAListado();
    this.productoService.actualizarProductos(this.producto)
      .subscribe(
        producto => {            
          swal.fire('Libro Actualizado', `Libro ${producto.nombre} actualizado.`, 'success')        
        }   
      )    
  }
  irAListado(){
    this.router.navigate(['admin/principal/productos'])
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
