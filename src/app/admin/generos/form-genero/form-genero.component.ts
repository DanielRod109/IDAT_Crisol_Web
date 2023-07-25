import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/clases/categoria';
import { Genero } from 'src/app/clases/genero';
import { GeneroServiceService } from 'src/app/servicios/api-gen/genero-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-genero',
  templateUrl: './form-genero.component.html',
  styleUrls: ['./form-genero.component.css']
})
export class FormGeneroComponent implements OnInit{
  
  categorias: Categoria[];
  seleccionCategoria : number;
  public genero : Genero = new Genero();

  constructor(
    private generoService:GeneroServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarGeneros();
    this.cargarCategorias();
  }


  cargarGeneros(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.generoService.buscarGenero(id).subscribe(
          (genero) => {
            this.genero = genero;
            this.seleccionCategoria = genero.categoria?.categoriaId || 0; 
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  cargarCategorias(): void {
    this.generoService.listarCategorias().subscribe(
      (response: Categoria[]) => {
        this.categorias = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public crearGenero(): void {
    
    this.generoService
      .crearGenero(this.genero, this.seleccionCategoria)
      .subscribe(
        (usuario) => {
          this.router.navigate(['/admin/principal/generos']);
          swal.fire(
            'Éxito!',
            'Género creado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    
  }

  public editarGenero(): void {
   
    this.generoService
      .editarGenero(this.genero, this.seleccionCategoria)
      .subscribe(
        (genero) => {
          this.router.navigate(['/admin/principal/generos']);
          swal.fire(
            'Éxito!',
            'Género actualizado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
  }


}
