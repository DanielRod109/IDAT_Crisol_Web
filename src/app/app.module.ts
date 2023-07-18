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
import { RegistrarComponent } from './admin/producto/registrar/registrar.component';
import { EditarComponent } from './admin/producto/editar/editar.component';
import { ProductoRegistrarEditarComponent } from './admin/producto/producto-registrar-editar/producto-registrar-editar.component';
import { PrincipalAdminComponent } from './admin/principal-admin/principal-admin.component';
import { AsignarMotorizadoComponent } from './admin/asignar-motorizado/asignar-motorizado.component';
import { MotorizadoComponent } from './admin/motorizado/motorizado.component';
import { MotorizadoRegistrarEditarComponent } from './admin/motorizado/motorizado-registrar-editar/motorizado-registrar-editar.component';
import { AuthguardGuard } from './seguridad/authguard.guard';

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
    RegistrarComponent,
    EditarComponent,
    ProductoRegistrarEditarComponent,
    PrincipalAdminComponent,
    AsignarMotorizadoComponent,
    MotorizadoComponent,
    MotorizadoRegistrarEditarComponent
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
    HttpClientModule
  ],
  providers: [AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }