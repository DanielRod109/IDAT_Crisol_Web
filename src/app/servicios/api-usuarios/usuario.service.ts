import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable, switchMap, tap } from "rxjs";
import { LoginInterface } from "src/app/clases/LoginInterface";
import { RespuestaInterface } from "src/app/clases/RespuestaLoginInterface";
import { Rol } from "src/app/clases/rol";
import { Usuario } from 'src/app/clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlUsuario:string ='http://localhost:8080/crisol/usuario/';

  private urlRol:string = 'http://localhost:8080/crisol/rol/'

  

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  
  private usuarioLogueado: boolean = false;
  private rolUsuario: string | null = null;
  private nombres: string | null = null;

  constructor(private http:HttpClient,private router: Router) {
    const isLoggedInString = localStorage.getItem('usuarioLogueado');
    const rolUsuarioString = localStorage.getItem('rolUsuario');
    const nombreString = localStorage.getItem('nombres');
    if (isLoggedInString) {
      this.usuarioLogueado = JSON.parse(isLoggedInString);
    }
    if (rolUsuarioString) {
      this.rolUsuario = rolUsuarioString;
    }
    if (nombreString) {
      this.nombres = nombreString;
    }
   }

  listarUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlUsuario+"listar").pipe(
      map(response=> response as Usuario[])
    );
  }
 
  listarRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(this.urlRol+"listar").pipe(
      map(response=> response as Rol[])
    );
  }
 
  crearUsuario(usuario: Usuario, rolId: number): Observable<Usuario> {
    return this.buscarRol(rolId).pipe(
      switchMap((rol: Rol) => {
        usuario.rol = rol; // Asigna el objeto Rol al campo rol del objeto Usuario
        return this.http.post<Usuario>(this.urlUsuario + "crear", usuario, { headers: this.httpHeaders });
      })
    );
  }
 
  editarUsuario(usuario: Usuario, rolId: number): Observable<Usuario> {
    return this.buscarRol(rolId).pipe(
      switchMap((rol: Rol) => {
        usuario.rol = rol; // Asigna el objeto Rol al campo rol del objeto Usuario
        return this.http.put<Usuario>(`${this.urlUsuario}editar/${usuario.usuarioId}`, usuario, { headers: this.httpHeaders });
      })
    );
  }
 
  buscarUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlUsuario}buscar/${id}`);
  }

  buscarRol(rolId: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.urlRol}buscar/${rolId}`);
  }
 
  eliminarUsuario(id:number):Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlUsuario}eliminar/${id}`,{headers:this.httpHeaders})
  }

  autenticar(form: LoginInterface): Observable<RespuestaInterface> {
    let url_autenticar = this.urlUsuario + "autenticar";
    return this.http.post<RespuestaInterface>(url_autenticar, form)
      .pipe(
        tap((respuesta: RespuestaInterface) => {
         
        if (respuesta.message == "Inicio de sesión exitoso"){
            this.usuarioLogueado = true;
            this.rolUsuario = respuesta.rolUsuario;
            this.nombres = respuesta.nombres;
            localStorage.setItem('usuarioLogueado', JSON.stringify(this.usuarioLogueado));
            localStorage.setItem('rolUsuario', this.rolUsuario);
            localStorage.setItem('nombres', this.nombres);
          }
        })
      );
  }

  login() {
    this.usuarioLogueado = true;
    localStorage.setItem('usuarioLogueado', JSON.stringify(this.usuarioLogueado));
  }

  logout() {
    this.usuarioLogueado = false;
    this.rolUsuario = null;
    this.nombres = null;
    localStorage.setItem('usuarioLogueado', JSON.stringify(this.usuarioLogueado));
    localStorage.removeItem('rolUsuario');
    localStorage.removeItem('nombres');
    setTimeout(() => {
      this.router.navigate(['admin/login']);
      
    }, 800);
  }

  isAuthenticated(): boolean {
    return this.usuarioLogueado;
  }

  getRolUsuario(): string | null {
    return this.rolUsuario;
  }

  getNombreTrabajador(): string | null {
    return this.nombres;
  }

}