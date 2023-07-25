import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './admin/categoria/categoria.component';
import { PrincipalComponent } from'./clientes/principal/principal.component';
import { LoginComponent } from './clientes/login/login.component';
import { RegistroComponent } from './clientes/registro/registro.component';
import { ProductoComponent } from './admin/producto/producto.component';
import { RegistrarComponent } from './admin/producto/registrar/registrar.component';
import { EditarComponent } from './admin/producto/editar/editar.component';
import { PrincipalAdminComponent } from './admin/principal-admin/principal-admin.component';

import { ProductoRegistrarEditarComponent } from './admin/producto/producto-registrar-editar/producto-registrar-editar.component';
import { MotorizadoComponent } from './admin/motorizado/motorizado.component';
import { MotorizadoRegistrarEditarComponent } from './admin/motorizado/motorizado-registrar-editar/motorizado-registrar-editar.component';
import { FormUsuarioComponent } from './admin/usuarios/form-usuario/form-usuario.component';
import { LoginUsuarioComponent } from './admin/usuarios/login-usuario/login-usuario.component';
import { UsuarioComponent } from './admin/usuarios/usuario/usuario.component';
import { AuthguardGuard } from './seguridad/authguard.guard';
import { AsignarMotorizadoComponent } from './admin/asignar-motorizado/asignar-motorizado.component';
import { DatosEntregaComponent } from './clientes/datos-entrega/datos-entrega.component';

const routes: Routes = [
  { 
    path: '' , redirectTo:'crisol',
    pathMatch:'full'
  },
  { path:'crisol', 
    component:PrincipalComponent
  },
  { 
    path:'crisol/cliente/cuenta/login', 
    component:LoginComponent
  },
  { 
    path: 'crisol/cliente/cuenta/registrarse', 
    component:RegistroComponent
  },

  //login admin
  { 
    path:'admin/login', 
    component:LoginUsuarioComponent
  },

  //Registrar Datos Entrega
  {
    path: 'crisol/entrega',
    component: DatosEntregaComponent
  },
  
  //ruta para el menú backoffice
  { 
    path:'admin/principal', 
    component:PrincipalAdminComponent,
    canActivate: [AuthguardGuard], // indica que el usuario debe iniciar sesion
  children:[
    //sub rutas para utilizar "<router-outlet>" dentro del menú principal

    //CRUD Productos
    { path:'productos', component:ProductoComponent},
    { path:'crud-producto', component:ProductoRegistrarEditarComponent},
    { path:'crud-producto/:id', component:ProductoRegistrarEditarComponent},
    //CRUD Motorizados
    { path:'motorizados', component:MotorizadoComponent},
    { path:'crud-motorizado', component:MotorizadoRegistrarEditarComponent},
    { path:'crud-motorizado/:id',component:MotorizadoRegistrarEditarComponent},
    //Asignar Motorizado
    { path:'asignar-motorizado', component:AsignarMotorizadoComponent}


  ]
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PrincipalComponent,CategoriaComponent,LoginComponent,
                        RegistroComponent, UsuarioComponent,FormUsuarioComponent,LoginUsuarioComponent]
