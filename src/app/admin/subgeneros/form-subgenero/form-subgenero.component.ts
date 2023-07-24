import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subgenero } from 'src/app/clases/subgnero';
import { SubgeneroService } from 'src/app/servicios/api-subgeneros/subgenero.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-subgenero',
  templateUrl: './form-subgenero.component.html',
  styleUrls: ['./form-subgenero.component.css']
})
export class FormSubgeneroComponent implements OnInit{

  public subgenero:Subgenero = new Subgenero();

  constructor(
    private subgeneroService: SubgeneroService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.cargarSubgeneros();
  }

  cargarSubgeneros(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];

      if (id) {
        this.subgeneroService.buscarSubgenero(id).subscribe(
          (subgenero) => {
            this.subgenero = subgenero;
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  public crearSubgenero(): void {
    
    this.subgeneroService
      .crearSubgenero(this.subgenero)
      .subscribe(
        (usuario) => {
          this.router.navigate(['/admin/principal/subgeneros']);
          swal.fire(
            'Éxito!',
            'Subgénero creado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    
  }

  public editarSubgenero(): void {
   
    this.subgeneroService
      .editarSubgenero(this.subgenero)
      .subscribe(
        (usuario) => {
          this.router.navigate(['/admin/principal/subgeneros']);
          swal.fire(
            'Éxito!',
            'Subgénero actualizado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
  }


}
