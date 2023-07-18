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

const routes: Routes = [
  { path: '' , redirectTo:'crisol', pathMatch:'full'},
  { path:'crisol', component:PrincipalComponent},
  { path:'crisol/cliente/cuenta/login', component:LoginComponent},
  { path: 'crisol/cliente/cuenta/registrarse', component:RegistroComponent},





  
  //ruta para el menú backoffice
  { path:'admin/principal', component:PrincipalAdminComponent,
  children:[
    //sub rutas para utilizar "<router-outlet>" dentro del menú principal
    { path:'productos', component:ProductoComponent},
    //{ path:'registrar-producto', component:RegistrarComponent},
    //{ path:'editar-producto/:id', component:EditarComponent},
    { path:'crud-producto', component:ProductoRegistrarEditarComponent},
    { path:'crud-producto/:id', component:ProductoRegistrarEditarComponent},
    { path:'motorizados', component:MotorizadoComponent},
    { path:'crud-motorizado', component:MotorizadoRegistrarEditarComponent},
    { path:'crud-motorizado/:id',component:MotorizadoRegistrarEditarComponent}
  ]
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PrincipalComponent,CategoriaComponent,LoginComponent,RegistroComponent, ]
