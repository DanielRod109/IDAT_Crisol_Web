import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/clases/genero';
import { GeneroSubgenero } from 'src/app/clases/generos-subgeneros';
import { Subgenero } from 'src/app/clases/subgnero';
import { GenSubService } from 'src/app/servicios/api-generos-subgeneros/gen-sub.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-gen-sub',
  templateUrl: './form-gen-sub.component.html',
  styleUrls: ['./form-gen-sub.component.css']
})
export class FormGenSubComponent {

  generos: Genero[];
  seleccionGenero : number;
  subgeneros: Subgenero[];
  seleccionSubgenero : number;
  public genSub : GeneroSubgenero = new GeneroSubgenero();

  constructor(
    private gensubService:GenSubService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarGeneros();
    this.cargarSubgeneros();
  }

  cargarGeneros(): void {
    this.gensubService.listarGeneros().subscribe(
      (response: Genero[]) => {
        this.generos = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  cargarSubgeneros(): void {
    this.gensubService.listarSubgeneros().subscribe(
      (response: Subgenero[]) => {
        this.subgeneros = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public crearGeneroSubgenero(): void {
    
    this.gensubService
      .crearGeneroSubgenero(this.genSub, this.seleccionGenero,this.seleccionSubgenero)
      .subscribe(
        (gensu) => {
          this.router.navigate(['/admin/principal/generos-subgeneros']);
          swal.fire(
            'Éxito!',
            'Género - Subgénero creado correctamente',
            'success'
          )
        },
        (error) => {
          console.error(error);
        }
      );
    
  }
  
}
