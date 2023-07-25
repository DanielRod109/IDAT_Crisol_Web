import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map, switchMap } from 'rxjs';
import { Productos } from 'src/app/clases/producto';
import { Subgenero } from 'src/app/clases/subgnero';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  baseUrl: string = 'http://localhost:8080/crisol/libro/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
//se agregó buscarNombre
  //buscarNombre: string ='http://localhost:8080/crisol/libro/buscarNombreAutorEditorial'

  private urlSubgenero:string ='http://localhost:8080/crisol/subgenero/';

  constructor(private httpClient: HttpClient) { }

  listarSubgeneros():Observable<Subgenero[]>{
    return this.httpClient.get<Subgenero[]>(this.urlSubgenero+"listar").pipe(
      map(response=> response as Subgenero[])
    )
  }
  //
  obtenerProductos(): Observable<Productos[]> {
    return this.httpClient.get<Productos[]>(`${this.baseUrl}listar`).pipe(
      map(response => response as Productos[])
    );
  }

registrarProductos(producto: Productos, subgeneroId: number): Observable<Productos> {
  return this.buscarSubgenero(subgeneroId).pipe(
    switchMap((subgenero: Subgenero) => {
          producto.subgenero = subgenero;
          return this.httpClient.post<Productos>(`${this.baseUrl}registrar`, producto, {headers: this.httpHeaders});
      })
  );
}

  actualizarProductos(producto:Productos, subgeneroId: number):Observable<Productos>{
    return this.buscarSubgenero(subgeneroId).pipe(
      switchMap((subgenero: Subgenero) => {
          producto.subgenero = subgenero;
          return this.httpClient.put<Productos>(`${this.baseUrl}editar/${producto.id_libro}`,producto,{headers:this.httpHeaders});
      })
  );
  }

  obtenerProducto(id_libro:number):Observable<Productos>{
    return this.httpClient.get<Productos>(`${this.baseUrl}buscar/${id_libro}`);
  }
  //

   //se agrego este metodo
   buscarPorNombreAutorEditorial(nombre: string): Observable<Productos[]> {
    const url = `${this.baseUrl}buscarNombreAutorEditorial/${nombre}`;
    return this.httpClient.get<Productos[]>(url);
  }

  buscarLibroporSubgenero(subgenero: string): Observable<Productos[]> {
    const url = `${this.baseUrl}buscarLibroporSubgenero/${subgenero}`;
    return this.httpClient.get<Productos[]>(url);
  }

  buscarSubgenero(subgeneroId: number): Observable<Subgenero> {
    return this.httpClient.get<Subgenero>(`${this.urlSubgenero}buscar/${subgeneroId}`);
  }

}
