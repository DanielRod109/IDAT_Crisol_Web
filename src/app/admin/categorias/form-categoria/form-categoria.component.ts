import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/clases/categoria';
import { CategoriaService } from 'src/app/servicios/api-categorias/categoria.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit{

  public categoria:Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.categoriaService.buscarCategoria(id).subscribe(
          (categoria) => {
            this.categoria = categoria;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  public crearCategoria(): void {
    
    this.categoriaService
      .crearCategoria(this.categoria)
      .subscribe(
        (categoria) => {
          this.router.navigate(['/admin/principal/categorias']);
          swal.fire(
            'Éxito!',
            'Categoría creada correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    
  }

  public editarCategoria(): void {
   
    this.categoriaService
      .editarCategoria(this.categoria)
      .subscribe(
        (categoria) => {
          this.router.navigate(['/admin/principal/categorias']);
          swal.fire(
            'Éxito!',
            'Categoría actualizada correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
  }


}
