import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Categoria } from 'src/app/clases/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url:string ='http://localhost:8080/crisol/categoria/';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { 

  }


  listarCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url+"listar").pipe(
      map(response=> response as Categoria[])
    );
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
        return this.http.post<Categoria>(this.url + "crear", categoria, { headers: this.httpHeaders });
  }

  editarCategoria(categoria: Categoria,): Observable<Categoria> {
    {
        return this.http.put<Categoria>(`${this.url}editar/${categoria.categoriaId}`, categoria, { headers: this.httpHeaders });
      
    }
  }

  buscarCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.url}buscar/${id}`);
  }

  eliminarCategoria(id:number):Observable<Categoria>{
    return this.http.delete<Categoria>(`${this.url}eliminar/${id}`,{headers:this.httpHeaders})
  }

}
