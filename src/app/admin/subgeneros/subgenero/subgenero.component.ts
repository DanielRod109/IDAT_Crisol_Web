import { Component } from '@angular/core';
import { Subgenero } from 'src/app/clases/subgnero';
import { SubgeneroService } from 'src/app/servicios/api-subgeneros/subgenero.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subgenero',
  templateUrl: './subgenero.component.html',
  styleUrls: ['./subgenero.component.css']
})
export class SubgeneroComponent {
  subgeneros : Subgenero[]=[];

  constructor(private subgeneroService: SubgeneroService){}

  ngOnInit(): void{
    this.subgeneroService.listarSubgeneros().subscribe(
      (subgeneros)=>{
        this.subgeneros = subgeneros
      }
    );
  }

  delete(subgenero: Subgenero): void {
    Swal.fire({
      title: 'Está seguro?',
      text: "¿Seguro que desea eliminar el subgénero?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'

    }).then((result) => {

      if (result.isConfirmed) {
        this.subgeneroService.eliminarSubgenero(subgenero.subgeneroId).subscribe(
          response=>{
            this.subgeneros=this.subgeneros.filter(subg=> subg!== subgenero)
            Swal.fire(
              'Eliminado!',
              'Subgénero eliminado correctamente.',
              'success'
            )
          }
        )
      }
    })
  }

 
}
