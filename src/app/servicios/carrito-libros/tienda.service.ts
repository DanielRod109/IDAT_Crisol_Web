import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Productos } from 'src/app/clases/producto';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  baseUrl: string = 'http://localhost:8080/crisol/libro/listar'

  private myList: Productos[] = [];


  private myCart = new BehaviorSubject<Productos[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor(private httpClient: HttpClient) { }

  obtenerProductos(): Observable<Productos[]> {
    const response = this.httpClient.get<Productos[]>(`${this.baseUrl}`);
    return response
  }

  añadirProducto(product:Productos){

    if(this.myList.length === 0){
      product.stock = 1;
      this.myList.push(product)
      this.myCart.next(this.myList)
    }else{
      const prod = this.myList.find((element)=>{
        return element.id_libro === product.id_libro
      })
      if(prod){
        prod.stock = prod.stock +1;
        this.myCart.next(this.myList);
      }else{
        product.stock =1;
        this.myList.push(product);
        this.myCart.next(this.myList);
      }
    }   
  }

  eliminarProducto(id:number){
    this.myList = this.myList.filter((product)=>{
      return product.id_libro != id
    })
    this.myCart.next(this.myList);
  }

  findPById(id:number){
    return this.myList.find((element) =>{
      return element.id_libro === id
    })
  }

  totalCart(){
    const total = this.myList.reduce(function (acc, product) { return acc + (product.stock * product.precio); }, 0)
    return total;
  }
}
