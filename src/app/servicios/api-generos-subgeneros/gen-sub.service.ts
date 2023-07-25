import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Genero } from 'src/app/clases/genero';
import { GeneroSubgenero } from 'src/app/clases/generos-subgeneros';
import { Subgenero } from 'src/app/clases/subgnero';

@Injectable({
  providedIn: 'root'
})
export class GenSubService {

  private urlGenSub:string ='http://localhost:8080/crisol/genero-subgenero/';

  private urlGenero:string ='http://localhost:8080/crisol/genero/';

  private urlSubgenero:string ='http://localhost:8080/crisol/subgenero/';


  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { 

  }

  listarGenerosSubgeneros():Observable<any[]>{
    return this.http.get<any[]>(this.urlGenSub+"listar").pipe(
      map(response => {
        return response.map(item => {
          return {
            genero: item[0],
            subgenero: item[1]
          };
        });
      })
    );
  }

  crearGeneroSubgenero(generoSubgenero: GeneroSubgenero, generoId: number, subgeneroId: number): Observable<GeneroSubgenero> {
    return this.buscarGenero(generoId).pipe(
      switchMap(genero => {
        generoSubgenero.genero = genero;
        return this.buscarSubgenero(subgeneroId).pipe(
          switchMap(subgenero => {
            generoSubgenero.subgenero = subgenero;
            return this.http.post<GeneroSubgenero>(this.urlGenSub + "crear", generoSubgenero, { headers: this.httpHeaders });
          })
        );
      })
    );
  }
listarGeneros():Observable<Genero[]>{
  return this.http.get<Genero[]>(this.urlGenero+"listar").pipe(
    map(response=> response as Genero[])
  );
}

listarSubgeneros():Observable<Subgenero[]>{
  return this.http.get<Subgenero[]>(this.urlSubgenero+"listar").pipe(
    map(response=> response as Subgenero[])
  );
}

buscarGenero(id: number): Observable<Genero> {
  return this.http.get<Genero>(`${this.urlGenero}buscar/${id}`);
}

buscarSubgenero(id: number): Observable<Subgenero> {
  return this.http.get<Subgenero>(`${this.urlSubgenero}buscar/${id}`);
}

}
