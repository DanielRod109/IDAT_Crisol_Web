import { Component } from '@angular/core';
import { Categoria } from 'src/app/clases/categoria';
import { CategoriaService } from 'src/app/servicios/api-categorias/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  categorias : Categoria[] = [];

  constructor(private categoriaService: CategoriaService){}
  
  ngOnInit(): void{
    this.categoriaService.listarCategorias().subscribe(
      (categorias)=>{
        this.categorias = categorias
      }
    );
  }

  delete( categoria: Categoria): void {
    Swal.fire({
      title: 'Está seguro?',
      text: "¿Seguro que desea eliminar la categoría?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'

    }).then((result) => {

      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoria.categoriaId).subscribe(
          response=>{
            this.categorias=this.categorias.filter(cat=> cat!== categoria)
            Swal.fire(
              'Eliminado!',
              'Categoría eliminada correctamente.',
              'success'
            )
          }
        )
      }
    })
  }


}
