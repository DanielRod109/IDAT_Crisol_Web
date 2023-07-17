import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Productos } from 'src/app/clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  baseUrl: string = 'http://localhost:8080/crisol/libro/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  buscarNombre: string ='http://localhost:8080/crisol/libro/buscarNombreAutorEditorial'



  constructor(private httpClient: HttpClient) { }

  obtenerProductos(): Observable<Productos[]> {

    return this.httpClient.get<Productos[]>(`${this.baseUrl}listar`).pipe(
      map(response => response as Productos[])
    );
  }

  registrarProductos(producto:Productos): Observable<Productos>{
    return this.httpClient.post<Productos>(`${this.baseUrl}registrar`,producto,{headers:this.httpHeaders});
  }

  actualizarProductos(producto:Productos):Observable<Productos>{
    return this.httpClient.put<Productos>(`${this.baseUrl}editar/${producto.id_libro}`,producto,{headers:this.httpHeaders});
  }

  obtenerProducto(id_libro:number):Observable<Productos>{
    return this.httpClient.get<Productos>(`${this.baseUrl}buscar/${id_libro}`);
  }
  
   //se agrego este metodo
   buscarPorNombreAutorEditorial(nombre: string): Observable<Productos[]> {
    const url = `${this.buscarNombre}/${nombre}`;
    return this.httpClient.get<Productos[]>(url);
  }

}
