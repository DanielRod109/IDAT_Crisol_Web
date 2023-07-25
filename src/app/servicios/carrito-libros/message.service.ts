import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Productos } from 'src/app/clases/producto';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message = new Subject();

  constructor() { }

  
  sendMessage(producto: Productos): void {
    this.message.next(producto);
    console.log("Mensaje enviado")
  }


  getMessage(): Observable<any> {
    console.log("Mensaje recibido")
    return this.message.asObservable();
    
  }
}
