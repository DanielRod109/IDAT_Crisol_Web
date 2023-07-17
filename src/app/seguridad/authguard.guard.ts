import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../servicios/api-usuarios/usuario.service';
import { ClienteServiceService } from '../servicios/api-cliente/cliente-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private clienteService: ClienteServiceService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verificar si la ruta tiene la propiedad 'requiresLogin' y si es igual a false,
    // permitir el acceso a la ruta sin necesidad de iniciar sesión
    if (next.data && next.data['requiresLogin'] === false) {
      return true;
    }

    // Verificar si el usuario administrador está autenticado
    if (this.usuarioService.isAuthenticated() && state.url.includes('/admin/')) {
      // Permitir acceso a la ruta de administradores
      return true;
    }

    // Verificar si el cliente está autenticado
    if (this.clienteService.isAuthenticated() && state.url.includes('/crisol/')) {
      // Permitir acceso a la ruta de clientes
      return true;
    }

    // Redirigir al formulario de inicio de sesión correspondiente
    if (state.url.includes('/admin/')) {
      this.router.navigate(['/admin/login']);
    } else if (state.url.includes('/crisol/')) {
      this.router.navigate(['/crisol/cliente/cuenta/login']);
    } 
    
    return false;
  }
}