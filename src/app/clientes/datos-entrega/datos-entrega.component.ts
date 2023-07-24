import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-datos-entrega',
  templateUrl: './datos-entrega.component.html',
  styleUrls: ['./datos-entrega.component.css']
})
export class DatosEntregaComponent implements OnInit {

  @ViewChild('paypal',{ static : true }) paypalElement : ElementRef;


  ngOnInit() {

    /*
    paypal
    .Buttons()
    .render( this.paypalElement.nativeElement);
      */
  }
}
