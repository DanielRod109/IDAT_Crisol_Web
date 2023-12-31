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
        this.motorizadoService.obtenerMotorizado(id).subscribe
        ((motorizado) => this.motorizado = motorizado)
      }
    })
  }

  validarCampos(): boolean {
    if(!this.motorizado.nombres || this.motorizado.nombres.trim() === '') return false;
    if(!this.motorizado.apellidos || this.motorizado.apellidos.trim() === '') return false;
    if(!this.motorizado.dni) return false;
    if(!this.motorizado.placa || this.motorizado.placa.trim() === '' || this.motorizado.placa.length > 7) return false; // Considerando que la placa tenga un máximo de 7 caracteres.

    return true;
}

  public createMotorizado(): void{
    //this.irAListado();
    if(this.validarCampos()) {
    this.motorizadoService.registrarMotorizado(this.motorizado)
    .subscribe(
      (motorizado) =>{
        this.router.navigate(['admin/principal/motorizados']);
        swal.fire(
          'Éxito!',
          'Motorizado creado correctamente',
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


  updateMotorizado(): void{
    //this.irAListado();
    if(this.validarCampos()) {
    this.motorizadoService.actualizarMotorizado(this.motorizado)
    .subscribe(
      (motorizado) => {
        this.router.navigate(['admin/principal/motorizados']);
        swal.fire(
          'Éxito!',
         `Motorizado actualizado correctamente`, 
         'success') 
      } ,
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

 /* irAListado(){
    this.router.navigate(['admin/principal/motorizados'])
  }*/



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
