import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Subgenero } from 'src/app/clases/subgnero';

@Injectable({
  providedIn: 'root'
})
export class SubgeneroService {

  private url:string ='http://localhost:8080/crisol/subgenero/';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { 

  }

  listarSubgeneros():Observable<Subgenero[]>{
    return this.http.get<Subgenero[]>(this.url+"listar").pipe(
      map(response=> response as Subgenero[])
    );
  }

  crearSubgenero(subgenero: Subgenero): Observable<Subgenero> {
        return this.http.post<Subgenero>(this.url + "crear", subgenero, { headers: this.httpHeaders });
  }

  editarSubgenero(subgenero: Subgenero,): Observable<Subgenero> {
    {
        return this.http.put<Subgenero>(`${this.url}editar/${subgenero.subgeneroId}`, subgenero, { headers: this.httpHeaders });
      
    }
  }

  buscarSubgenero(id: number): Observable<Subgenero> {
    return this.http.get<Subgenero>(`${this.url}buscar/${id}`);
  }

  eliminarSubgenero(id:number):Observable<Subgenero>{
    return this.http.delete<Subgenero>(`${this.url}eliminar/${id}`,{headers:this.httpHeaders})
  }


}
