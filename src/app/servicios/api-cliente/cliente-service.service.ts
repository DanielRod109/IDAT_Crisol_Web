import { Injectable } from '@angular/core';
import { LoginInterface } from '../../clases/LoginInterface';
import { RespuestaInterface } from 'src/app/clases/RespuestaLoginInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Cliente } from 'src/app/clases/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  private url: string = "http://localhost:8080/crisol/cliente/";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private clienteLogueado: boolean = false;
  private clienteNombre: string | null = null;
  private clienteId: number | null = null;

  constructor(private http: HttpClient) {
    const isLoggedInString = localStorage.getItem('clienteLogueado');
    const clienteNombreString = localStorage.getItem('clienteNombre');
    const clienteIdNumber = localStorage.getItem('clienteId')
    if (isLoggedInString) {
      this.clienteLogueado = JSON.parse(isLoggedInString);
    }
    if (clienteNombreString) {
      this.clienteNombre = clienteNombreString;
    }
    if (clienteIdNumber){
      this.clienteId = parseInt(clienteIdNumber);
    }
  }

  loginCorreo(form: LoginInterface): Observable<RespuestaInterface> {
    let url_autenticar = this.url + "autenticar";
    return this.http.post<RespuestaInterface>(url_autenticar, form)
      .pipe(
        tap((respuesta: RespuestaInterface) => {
         
        if (respuesta.message == "Inicio de sesión exitoso"){
            this.clienteLogueado = true;
            this.clienteNombre = respuesta.nombreCliente;
            this.clienteId = respuesta.id;
            localStorage.setItem('clienteLogueado', JSON.stringify(this.clienteLogueado));
            localStorage.setItem('clienteNombre', this.clienteNombre);
            localStorage.setItem('clienteId', JSON.stringify(this.clienteId));
          }
        })
      );
  }

  login() {
    this.clienteLogueado = true;
    localStorage.setItem('clienteLogueado', JSON.stringify(this.clienteLogueado));
  }

  logout() {
    this.clienteLogueado = false;
    this.clienteNombre = null;
    this.clienteId = null;
    localStorage.setItem('clienteLogueado', JSON.stringify(this.clienteLogueado));
    localStorage.removeItem('clienteNombre');
    localStorage.removeItem('clienteId');
  }

  listarCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url+"listar").pipe(
      map(response=> response as Cliente[])
    );
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url + "crear", cliente, { headers: this.httpHeaders });
  }

  editarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}editar/${cliente.clienteId}`, cliente, { headers: this.httpHeaders });
      
  }

  buscarCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}buscar/${id}`);
  }

  eliminarCliente(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.url}eliminar/${id}`,{headers:this.httpHeaders})
  }


  isAuthenticated(): boolean {
    return this.clienteLogueado;
  }

  getClienteNombre(): string | null {
    return this.clienteNombre;
  }

  getClienteId(): number | null {
    return this.clienteId;
  }
}