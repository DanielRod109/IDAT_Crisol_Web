import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/clases/producto';
import { Subgenero } from 'src/app/clases/subgnero';
import { ProductosService } from 'src/app/servicios/api-productos/productos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-producto-registrar-editar',
  templateUrl: './producto-registrar-editar.component.html',
  styleUrls: ['./producto-registrar-editar.component.css']
})
export class ProductoRegistrarEditarComponent implements OnInit {

  subgenero : Subgenero[];
  seleccionSubgenero:number;
  public producto: Productos = new Productos()
  constructor(private productoService: ProductosService, private activatedRoute: ActivatedRoute, private router: Router) { }
  
  
  ngOnInit(): void {
    this.cargarSubgeneros();
    this.cargarProductos()
  }

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


  cargarProductos(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.productoService.obtenerProducto(id).subscribe(
          (producto) => {
            this.producto = producto;
            this.seleccionSubgenero = producto.subgenero?.subgeneroId || 0; 
           
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
  validarCampos(): boolean {
    if(!this.producto.nombre || this.producto.nombre.trim() === '') return false;

    if(!this.producto.editorial || this.producto.editorial.trim() === '') return false;
    if(!this.producto.peso) return false;
    if(!this.producto.alto) return false;
    if(!this.producto.ancho) return false;
    if(!this.producto.stock) return false;
    if(!this.producto.precio) return false;
    if(!this.producto.aedicion) return false;
    if(!this.producto.npaginas) return false;
    if(!this.producto.nombre_autor) return false;
    if(this.seleccionSubgenero === 0 || !this.seleccionSubgenero) return false;
   if(!this.producto.img) return false;
    return true;
}

  guardarProducto(){
    if(this.validarCampos()) {
    this.productoService
    .registrarProductos(this.producto, this.seleccionSubgenero)
    .subscribe(
      (producto) => {
        this.router.navigate(['admin/principal/productos']);
        swal.fire(
          'Éxito!',
          'Producto creado correctamente',
          'success'
        )
    },error => console.log(error));
    }
    else{
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Datos incompletos'
      })
    }
  }

  public editarProducto(): void {
    if(this.validarCampos()) {
    this.productoService
      .actualizarProductos(this.producto, this.seleccionSubgenero)
      .subscribe(
        (producto) => {
          this.router.navigate(['admin/principal/productos']);
          swal.fire(
            'Éxito!',
            'Producto actualizado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    }
    else{
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Datos incompletos'
      })
    }
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
