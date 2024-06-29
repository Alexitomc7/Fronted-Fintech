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
import { PerfilComponent } from './components/perfil/perfil.component';
import { NoticiasListaComponent } from './components/noticias/noticias-lista/noticias-lista.component';
import { UniversidadesVerComponent } from './components/universidades/universidades-ver/universidades-ver.component';
import { UniversidadesEditorComponent } from './components/universidades/universidades-editor/universidades-editor.component';
import { ConfirmaComponent } from './components/confirma/confirma.component';
import { NoticiasEditorComponent } from './components/noticias/noticias-editor/noticias-editor.component';
import { NoticiasDetalleComponent } from './components/noticias/noticias-detalle/noticias-detalle.component';
import { CarrerasVerComponent } from './components/carreras/carreras-ver/carreras-ver.component';
import { CarrerasEditorComponent } from './components/carreras/carreras-editor/carreras-editor.component';
import { PerfilEditorComponent } from './components/perfil/perfil-editor/perfil-editor.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



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
    CarrerasDetalleComponent,
    PerfilComponent,
    NoticiasListaComponent,
    UniversidadesVerComponent,
    UniversidadesEditorComponent,
    ConfirmaComponent,
    NoticiasEditorComponent,
    NoticiasDetalleComponent,
    CarrerasVerComponent,
    CarrerasEditorComponent,
    PerfilEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync('noop'),
    DatePipe,
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

