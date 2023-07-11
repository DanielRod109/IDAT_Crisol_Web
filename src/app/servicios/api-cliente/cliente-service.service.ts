import { Injectable } from '@angular/core';
import { LoginInterface } from '../../clases/LoginInterface';
import { RespuestaInterface } from 'src/app/clases/RespuestaLoginInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/clases/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  private url: string = "http://localhost:8080/crisol/cliente/";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    if (isLoggedInString) {
      this.isLoggedIn = JSON.parse(isLoggedInString);
    }
  }

  loginCorreo(form: LoginInterface): Observable<RespuestaInterface> {
    let url_autenticar = this.url + "autenticar";
    return this.http.post<RespuestaInterface>(url_autenticar, form);
  }

  login() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url + "crear", cliente, { headers: this.httpHeaders });
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}