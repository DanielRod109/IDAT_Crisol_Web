import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Vental } from 'src/app/clases/ventaL';
import { VentaDto } from 'src/app/clases/ventadto';

@Injectable({
  providedIn: 'root'
})
export class VentasService {


  baseUrl: string = 'http://localhost:8080/crisol/venta/'
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private httpClient: HttpClient) { }


  registrarVenta(ventadto:VentaDto): Observable<VentaDto>{
    return this.httpClient.post<VentaDto>(`${this.baseUrl}registrar`,ventadto,{headers:this.httpHeaders})

  }

  buscarVentaCliente(id:number): Observable<Vental[]>{
    return this.httpClient.get<Vental[]>(`${this.baseUrl}clientes/${id}`).pipe(
      map(response => response as Vental[])
    );
  }

  buscarVenta(id:number): Observable<Vental>{
    return this.httpClient.get<Vental>(`${this.baseUrl}buscar/${id}`);
  }

  obtenerVentas(): Observable<Vental[]> {
    return this.httpClient.get<Vental[]>(`${this.baseUrl}listar`).pipe(
      map(response => response as Vental[])
    );
  }
  




}
