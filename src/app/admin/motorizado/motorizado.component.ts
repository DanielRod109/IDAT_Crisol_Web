import { Component } from '@angular/core';
import { Motorizado } from 'src/app/clases/motorizado';
import { Router } from '@angular/router';
import { ApiMotorizadoService } from 'src/app/servicios/api-motorizado/api-motorizado.service';

@Component({
  selector: 'app-motorizado',
  templateUrl: './motorizado.component.html',
  styleUrls: ['./motorizado.component.css']
})
export class MotorizadoComponent {

  motorizados: Motorizado[];

  constructor(private motorizadoService:ApiMotorizadoService, private router:Router){}



  ngOnInit(): void{
    this.getMotorizados();
  }


  getMotorizados(){
  this.motorizadoService.obtenerMotorizados().subscribe((data) =>{
    return this.motorizados = data;
  })
  }

}
 