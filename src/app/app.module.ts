import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';




import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';

import { MenuComponent } from './admin/menu/menu.component';

//import { CategoriaComponent } from './admin/categoria/categoria.component';

//import { LoginComponent } from './clientes/login/login.component';

//import { RegistroComponent } from './clientes/registro/registro.component';

//import { PrincipalComponent } from './clientes/principal/principal.component';




import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { FooterComponent } from './clientes/plantillas/footer/footer.component';

import { HeaderComponent } from './clientes/plantillas/header/header.component'

import { ClienteServiceService } from './servicios/api-cliente/cliente-service.service';

import { CarritoComponent } from './clientes/carrito/carrito.component';

import { ProductosComponent } from './clientes/productos/productos.component';

import { ProductoComponent } from './admin/producto/producto.component';

import { ProductoRegistrarEditarComponent } from './admin/producto/producto-registrar-editar/producto-registrar-editar.component';

import { PrincipalAdminComponent } from './admin/principal-admin/principal-admin.component';

import { UsuarioComponent } from './admin/usuarios/usuario/usuario.component';

import { FormUsuarioComponent } from './admin/usuarios/form-usuario/form-usuario.component';

import { LoginUsuarioComponent } from './admin/usuarios/login-usuario/login-usuario.component';

import { AuthguardGuard } from './seguridad/authguard.guard';

import { AsignarMotorizadoComponent } from './admin/asignar-motorizado/asignar-motorizado.component';

import { MotorizadoComponent } from './admin/motorizado/motorizado.component';

import { MotorizadoRegistrarEditarComponent } from './admin/motorizado/motorizado-registrar-editar/motorizado-registrar-editar.component';

import { FormSubgeneroComponent } from './admin/subgeneros/form-subgenero/form-subgenero.component';

import { SubgeneroComponent } from './admin/subgeneros/subgenero/subgenero.component';

import { FormGeneroComponent } from './admin/generos/form-genero/form-genero.component';

import { GeneroComponent } from './admin/generos/genero/genero.component';

import { FormCategoriaComponent } from './admin/categorias/form-categoria/form-categoria.component';

import { CategoriaComponent } from './admin/categorias/categoria/categoria.component';

import { FormGenSubComponent } from './admin/generos-subgeneros/form-gen-sub/form-gen-sub.component';

import { GenSubComponent } from './admin/generos-subgeneros/gen-sub/gen-sub.component';

import { BannerComponent } from './clientes/plantillas/banner/banner.component';

import { ListaCompraComponent } from './clientes/lista-compra/lista-compra.component';




//PAYPAL

import { NgxPayPalModule } from 'ngx-paypal';

import { DatosEntregaComponent } from './clientes/datos-entrega/datos-entrega.component';
import { ElegirMotorizadoComponent } from './admin/asignar-motorizado/elegir-motorizado/elegir-motorizado.component';



import { FormClienteComponent } from './admin/clientes/form-cliente/form-cliente.component';
import { ClienteComponent } from './admin/clientes/cliente/cliente.component';
import { VentasCursoComponent } from './admin/asignar-motorizado/ventas-curso/ventas-curso.component';
import { ReporteVentasComponent } from './admin/reportes/reporte-ventas/reporte-ventas.component';
import { ReporteDetalleVentasComponent } from './admin/reportes/reporte-detalle-ventas/reporte-detalle-ventas.component';

@NgModule({

  declarations: [

    AppComponent,

    MenuComponent,

    routingComponents,

    FooterComponent,

    HeaderComponent,

    CarritoComponent,

    ProductosComponent,

    ProductoComponent,

    //RegistrarComponent,

    //EditarComponent,

    ProductoRegistrarEditarComponent,

    PrincipalAdminComponent,

   // UsuarioComponent,

    //FormUsuarioComponent,

    //LoginUsuarioComponent

    AsignarMotorizadoComponent,

    MotorizadoComponent,

    MotorizadoRegistrarEditarComponent,

    FormSubgeneroComponent,

    SubgeneroComponent,

    FormGeneroComponent,

    GeneroComponent,

    FormCategoriaComponent,

    CategoriaComponent,

    FormGenSubComponent,

    GenSubComponent,

    BannerComponent,

    AsignarMotorizadoComponent,

    MotorizadoComponent,

    MotorizadoRegistrarEditarComponent,

    ListaCompraComponent,

    DatosEntregaComponent,
      ElegirMotorizadoComponent,

    FormClienteComponent,
    ClienteComponent,
    VentasCursoComponent,
    ReporteVentasComponent,
    ReporteDetalleVentasComponent
   // CategoriaComponent,

   // LoginComponent,

   // RegistroComponent,

   // PrincipalComponent

  ],

  imports: [

    BrowserModule,

    AppRoutingModule,

    ReactiveFormsModule,

    FormsModule,

    NgxPayPalModule,

    HttpClientModule

  ],

  providers: [AuthguardGuard],

  bootstrap: [AppComponent]

})

export class AppModule { }