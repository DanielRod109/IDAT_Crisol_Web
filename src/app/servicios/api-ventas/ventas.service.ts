import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Motorizado } from 'src/app/clases/motorizado';
import { Vental } from 'src/app/clases/ventaL';
import { VentaDto } from 'src/app/clases/ventadto';

@Injectable({
  providedIn: 'root'
})
export class VentasService {


  private baseUrl: string = 'http://localhost:8080/crisol/venta/'

  private motorizadoUrl: string = 'http://localhost:8080/crisol/motorizado/'


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

  obtenerVentasPendientesDomicilio(): Observable<Vental[]> {
    return this.httpClient.get<Vental[]>(`${this.baseUrl}listarpendientes`).pipe(
      map(response => response as Vental[])
    );
  }

  obtenerVentasConfirmar(): Observable<Vental[]> {
    return this.httpClient.get<Vental[]>(`${this.baseUrl}listarconfirmar`).pipe(
      map(response => response as Vental[])
    );
  }
  

  asignarVenta(venta:Vental,motorizadoId:number): Observable<Vental> {
    return this.buscarMotorizado(motorizadoId).pipe(
      switchMap((motorizado:Motorizado) =>{
        venta.motorizado = motorizado;
        return this.httpClient.put<Vental>(`${this.baseUrl}asignar/${venta.ventaId}`, venta, { headers: this.httpHeaders });
      })
    )
  }

  confirmarVenta(ventaId:number):Observable<Vental>{
    return this.httpClient.put<Vental>(`${this.baseUrl}confirmar/${ventaId}`,{ headers: this.httpHeaders });

  }

  buscarMotorizado(id:number): Observable<Motorizado> {
    return this.httpClient.get<Motorizado>(`${this.motorizadoUrl}buscar/${id}`)
  }
  




}
