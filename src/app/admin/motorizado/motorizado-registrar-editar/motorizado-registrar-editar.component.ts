import { Component, OnInit } from '@angular/core';
import { Motorizado } from 'src/app/clases/motorizado';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMotorizadoService } from 'src/app/servicios/api-motorizado/api-motorizado.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-motorizado-registrar-editar',
  templateUrl: './motorizado-registrar-editar.component.html',
  styleUrls: ['./motorizado-registrar-editar.component.css']
})
export class MotorizadoRegistrarEditarComponent implements OnInit {

  public motorizado: Motorizado = new Motorizado()
  constructor(private motorizadoService: ApiMotorizadoService, private activatedRoute: ActivatedRoute, private router: Router){}


  ngOnInit(): void {
    this.cargarMotorizado()
  }

  cargarMotorizado(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.motorizadoService.obtenerMotorizado(id).subscribe((motorizado) => this.motorizado = motorizado)
      }
    })
  }

  public createMotorizado(): void{
    this.irAListado();
    this.motorizadoService.registrarMotorizado(this.motorizado)
    .subscribe(
      motorizado =>{
        this.router.navigate([])
      }
    );
  }


  updateMotorizado(): void{
    this.irAListado();
    this.motorizadoService.actualizarMotorizado(this.motorizado)
    .subscribe(
      motorizado => {
        swal.fire('Motorizado Actualizado', `Libro ${motorizado.nombres} actualizado.`, 'success') 
      } 
    )
  }

  irAListado(){
    this.router.navigate(['admin/principal/motorizados'])
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
