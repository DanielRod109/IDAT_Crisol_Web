import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Categoria } from 'src/app/clases/categoria';
import { Genero } from 'src/app/clases/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroServiceService {

  private urlGenero:string ='http://localhost:8080/crisol/genero/';

  private urlCategoria:string = 'http://localhost:8080/crisol/categoria/'


  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { 

  }

  listarGeneros():Observable<Genero[]>{
    return this.http.get<Genero[]>(this.urlGenero+"listar").pipe(
      map(response=> response as Genero[])
    );
  }

  listarCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlCategoria+"listar").pipe(
      map(response=> response as Categoria[])
    );
  }

  crearGenero(genero: Genero, categoriaId: number): Observable<Genero> {
    return this.buscarCategoria(categoriaId).pipe(
      switchMap((categoria: Categoria) => {
        genero.categoria = categoria; 
        return this.http.post<Genero>(this.urlGenero + "crear", genero, { headers: this.httpHeaders });
      })
    );
  }

  editarGenero(genero: Genero, categoriaId: number): Observable<Genero> {
    return this.buscarCategoria(categoriaId).pipe(
      switchMap((categoria: Categoria) => {
        genero.categoria = categoria; 
        return this.http.put<Genero>(`${this.urlGenero}editar/${genero.generoId}`, genero, { headers: this.httpHeaders });
      })
    );
  }

  buscarGenero(id: number): Observable<Genero> {
    return this.http.get<Genero>(`${this.urlGenero}buscar/${id}`);
  }

  buscarCategoria(categoriaId: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlCategoria}buscar/${categoriaId}`);
  }
 

  eliminarGenero(id:number):Observable<Genero>{
    return this.http.delete<Genero>(`${this.urlGenero}eliminar/${id}`,{headers:this.httpHeaders})
  }


}
