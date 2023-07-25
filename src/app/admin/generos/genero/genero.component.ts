import { Component } from '@angular/core';
import { Genero } from 'src/app/clases/genero';
import { GeneroServiceService } from 'src/app/servicios/api-gen/genero-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent {

  generos : Genero[]=[];

  constructor(private generoService: GeneroServiceService){}

  ngOnInit(): void{
    this.generoService.listarGeneros().subscribe(
      (generos)=>{
        this.generos = generos
      }
    );
  }

  delete(genero: Genero): void {
    Swal.fire({
      title: 'Está seguro?',
      text: "¿Seguro que desea eliminar el género?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'

    }).then((result) => {

      if (result.isConfirmed) {
        this.generoService.eliminarGenero(genero.generoId).subscribe(
          response=>{
            this.generos=this.generos.filter(gen=> gen!== genero)
            Swal.fire(
              'Eliminado!',
              'Género eliminado correctamente.',
              'success'
            )
          }
        )
      }
    })
  }


}
