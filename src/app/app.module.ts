import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './modules/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LogeoComponent } from './components/logeo/logeo.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UniversidadesListaComponent } from './components/universidades/universidades-lista/universidades-lista.component';
import { UniversidadesDetalleComponent } from './components/universidades/universidades-detalle/universidades-detalle.component';
import { CarrerasListaComponent } from './components/carreras/carreras-lista/carreras-lista.component';
import { CarrerasDetalleComponent } from './components/carreras/carreras-detalle/carreras-detalle.component';
import { proteccion1Guard } from './guards/proteccion1.guard';
import { Proteccion2Guard } from './guards/proteccion2.guard';
import { Proteccion3Guard } from './guards/proteccion3.guard';
import { AutorizadorInterceptor } from './interceptors/autorizador.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegistroComponent,
    LogeoComponent,
    InicioComponent,
    UniversidadesListaComponent,
    UniversidadesDetalleComponent,
    CarrerasListaComponent,
    CarrerasDetalleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync('noop'),
    proteccion1Guard,
    Proteccion2Guard,
    Proteccion3Guard,
    {
      provide:HTTP_INTERCEPTORS, useClass:AutorizadorInterceptor, multi:true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
