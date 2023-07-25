import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from 'src/app/clases/producto';
import { Subgenero } from 'src/app/clases/subgnero';
import { ProductosService } from 'src/app/servicios/api-productos/productos.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
 subgenero : Subgenero[];
  productos: Productos = new Productos();
  seleccionSubgenero:number;

  constructor(private productoService:ProductosService, private activatedRoute: ActivatedRoute,private router:Router){
  }

  guardarProducto(){
    this.productoService
    .registrarProductos(this.productos, this.seleccionSubgenero)
    .subscribe(
      (producto) => {
        this.router.navigate(['crisol/admin/producto']);
        swal.fire(
          'Éxito!',
          'Producto creado correctamente',
          'success'
        )
    },error => console.log(error));
  }

  public editarProducto(): void {
   
    this.productoService
      .actualizarProductos(this.productos, this.seleccionSubgenero)
      .subscribe(
        (producto) => {
          this.router.navigate(['/admin/principal/producto']);
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


  cargarProductos(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.productoService.obtenerProducto(id).subscribe(
          (producto) => {
            this.productos = producto;
            this.seleccionSubgenero = producto.subgenero?.subgeneroId || 0; 
         },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  onSubmit(){
    this.cargarSubgeneros();
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
