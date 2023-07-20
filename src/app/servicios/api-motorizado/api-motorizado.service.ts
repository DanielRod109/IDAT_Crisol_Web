import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Motorizado } from 'src/app/clases/motorizado';

@Injectable({
  providedIn: 'root'
})
export class ApiMotorizadoService {

  baseUrl: string = 'http://localhost:8080/crisol/motorizado/';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private httpClient: HttpClient) { }

  obtenerMotorizados(): Observable<Motorizado[]>{
    return this.httpClient.get<Motorizado[]>(`${this.baseUrl}listar`).pipe(
      map(response => response as Motorizado[])
    );
  }

  registrarMotorizado(motorizado:Motorizado): Observable<Motorizado>{
    return this.httpClient.post<Motorizado>(`${this.baseUrl}registrar`,motorizado,{headers:this.httpHeaders});
  }

  actualizarMotorizado(motorizado:Motorizado):Observable<Motorizado>{
    return this.httpClient.put<Motorizado>(`${this.baseUrl}editar/${motorizado.motorizadoId}`,motorizado,{headers:this.httpHeaders});
  }

  obtenerMotorizado(id:number):Observable<Motorizado>{
    return this.httpClient.get<Motorizado>(`${this.baseUrl}buscar/${id}`);
  }


}
