import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { MenuData } from 'src/app/clases/menuData';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url:string ='http://localhost:8080/crisol/categoria/';

  constructor(private http:HttpClient) { }
/*
  obtenerDatosMenu(): Observable<any>{
    return this.http.get<any>(this.url+"menu");
  }*/

  obtenerDatosMenu(): Observable<MenuData[]> {
    return this.http.get<MenuData[]>(this.url + "menu").pipe(
      tap(data => console.log('Datos del menú:', data)),
      catchError(error => {
        console.error('Error al obtener datos del menú:', error);
        return throwError(error);
      })
    );
  }

}
