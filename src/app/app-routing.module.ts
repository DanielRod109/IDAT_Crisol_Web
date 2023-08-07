import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from'./clientes/principal/principal.component';

import { LoginComponent } from './clientes/login/login.component';
import { RegistroComponent } from './clientes/registro/registro.component';
import { ProductoComponent } from './admin/producto/producto.component';
import { PrincipalAdminComponent } from './admin/principal-admin/principal-admin.component';
import { ProductoRegistrarEditarComponent } from './admin/producto/producto-registrar-editar/producto-registrar-editar.component';
import { UsuarioComponent } from './admin/usuarios/usuario/usuario.component';
import { FormUsuarioComponent } from './admin/usuarios/form-usuario/form-usuario.component';
import { LoginUsuarioComponent } from './admin/usuarios/login-usuario/login-usuario.component';
import { AuthguardGuard } from './seguridad/authguard.guard';
//import { LoginComponent } from './admin';
import { MotorizadoComponent } from './admin/motorizado/motorizado.component';
import { MotorizadoRegistrarEditarComponent } from './admin/motorizado/motorizado-registrar-editar/motorizado-registrar-editar.component';
import { SubgeneroComponent } from './admin/subgeneros/subgenero/subgenero.component';
import { FormSubgeneroComponent } from './admin/subgeneros/form-subgenero/form-subgenero.component';
import { GeneroComponent } from './admin/generos/genero/genero.component';
import { FormGeneroComponent } from './admin/generos/form-genero/form-genero.component';
import { CategoriaComponent } from './admin/categorias/categoria/categoria.component';
import { FormCategoriaComponent } from './admin/categorias/form-categoria/form-categoria.component';
import { GenSubComponent } from './admin/generos-subgeneros/gen-sub/gen-sub.component';
import { FormGenSubComponent } from './admin/generos-subgeneros/form-gen-sub/form-gen-sub.component';
import { AsignarMotorizadoComponent } from './admin/asignar-motorizado/asignar-motorizado.component';
import { DatosEntregaComponent } from './clientes/datos-entrega/datos-entrega.component';
import { ListaCompraComponent } from './clientes/lista-compra/lista-compra.component';
import { ElegirMotorizadoComponent } from './admin/asignar-motorizado/elegir-motorizado/elegir-motorizado.component';
 
const routes: Routes = [
  {
    path: '' , redirectTo:'crisol',
    pathMatch:'full'
  },
  { path:'crisol',
    component:PrincipalComponent
  },
  {
    path: 'crisol/:subgenero',
    component: PrincipalComponent
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
    path: 'crisol/cliente/entrega',
    component: DatosEntregaComponent
  },

  //Lista de compras Cliente
  {
    path: 'crisol/cliente/compras',
    component: ListaCompraComponent
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
   
    { path:'usuarios', component:UsuarioComponent},
    { path:'crud-usuarios', component:FormUsuarioComponent},
    { path:'crud-usuarios/:id', component:FormUsuarioComponent},

    { path:'motorizados', component:MotorizadoComponent},
    { path:'crud-motorizado', component:MotorizadoRegistrarEditarComponent},
    { path:'crud-motorizado/:id',component:MotorizadoRegistrarEditarComponent},

    { path: 'subgeneros', component:SubgeneroComponent},
    { path:'crud-subgeneros', component:FormSubgeneroComponent},
    { path:'crud-subgeneros/:id', component:FormSubgeneroComponent},

    { path: 'generos', component:GeneroComponent},
    { path:'crud-generos', component:FormGeneroComponent},
    { path:'crud-generos/:id', component:FormGeneroComponent},
 

    { path: 'categorias', component:CategoriaComponent},
    { path:'crud-categorias', component:FormCategoriaComponent},
    { path:'crud-categorias/:id', component:FormCategoriaComponent},
 
    
    { path: 'generos-subgeneros', component:GenSubComponent},
    { path:'registrar-generos-subgeneros', component:FormGenSubComponent},
 
 
    //CRUD Motorizados
    { path:'motorizados', component:MotorizadoComponent},
    { path:'crud-motorizado', component:MotorizadoRegistrarEditarComponent},
    { path:'crud-motorizado/:id',component:MotorizadoRegistrarEditarComponent},
    //Asignar Motorizado
    { path:'asignar-motorizado', component:AsignarMotorizadoComponent},
    { path: 'asignar-motorizado/elegir-motorizado/:id', component:ElegirMotorizadoComponent}
  ]
},
];

 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PrincipalComponent,LoginComponent,
                        RegistroComponent, UsuarioComponent,FormUsuarioComponent,LoginUsuarioComponent,
                      SubgeneroComponent, FormSubgeneroComponent, GeneroComponent,
                    FormGeneroComponent, FormCategoriaComponent, CategoriaComponent]