import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LogeoComponent } from './components/logeo/logeo.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UniversidadesListaComponent } from './components/universidades/universidades-lista/universidades-lista.component';
import { UniversidadesDetalleComponent } from './components/universidades/universidades-detalle/universidades-detalle.component';
import { UniversidadesVerComponent } from './components/universidades/universidades-ver/universidades-ver.component';
import { UniversidadesEditorComponent } from './components/universidades/universidades-editor/universidades-editor.component';
import { CarrerasListaComponent } from './components/carreras/carreras-lista/carreras-lista.component';
import { CarrerasDetalleComponent } from './components/carreras/carreras-detalle/carreras-detalle.component';
import { CarrerasEditorComponent } from './components/carreras/carreras-editor/carreras-editor.component';
import { CarrerasVerComponent } from './components/carreras/carreras-ver/carreras-ver.component';
import { NoticiasListaComponent } from './components/noticias/noticias-lista/noticias-lista.component';
import { NoticiasDetalleComponent } from './components/noticias/noticias-detalle/noticias-detalle.component';
import { NoticiasEditorComponent } from './components/noticias/noticias-editor/noticias-editor.component';
import { proteccion1Guard } from './guards/proteccion1.guard';
import { Proteccion2Guard} from './guards/proteccion2.guard';
import { Proteccion3Guard } from './guards/proteccion3.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilEditorComponent } from './components/perfil/perfil-editor/perfil-editor.component';



const routes: Routes = [
  {path:"", component:LandingPageComponent},
  {path:"registro", component:RegistroComponent},
  {path:"logeo", component: LogeoComponent},
  {path:"inicio", component: InicioComponent, canActivate:[proteccion1Guard]},
  {path:"perfil", component: PerfilComponent, canActivate:[proteccion1Guard]},
  {path:"perfil/editor", component: PerfilEditorComponent, canActivate:[proteccion1Guard]},
  {path:"universidades/lista", component: UniversidadesListaComponent, canActivate:[Proteccion2Guard]},
  {path:"universidades/ver/:id", component: UniversidadesVerComponent, canActivate:[Proteccion2Guard]},
  {path:"universidades/detalle/:codigo", component: UniversidadesDetalleComponent, canActivate:[Proteccion3Guard]},
  {path:"universidades/editor", component: UniversidadesEditorComponent, canActivate:[Proteccion3Guard]},
  {path:"universidades/agregar", component: UniversidadesDetalleComponent, canActivate:[Proteccion3Guard]},
  {path:"carreras/lista", component: CarrerasListaComponent, canActivate:[Proteccion2Guard]},
  {path:"carreras/ver/:id", component: CarrerasVerComponent, canActivate:[Proteccion2Guard]},
  {path:"carreras/detalle/:codigo", component: CarrerasDetalleComponent, canActivate:[Proteccion3Guard]},
  {path:"carreras/editor", component: CarrerasEditorComponent, canActivate:[Proteccion3Guard]},
  {path:"carreras/agregar", component: CarrerasDetalleComponent, canActivate:[Proteccion3Guard]}, 
  {path:"noticias/lista", component: NoticiasListaComponent, canActivate:[Proteccion2Guard]},
  {path:"noticias/editor", component: NoticiasEditorComponent, canActivate:[Proteccion3Guard]},
  {path:"noticias/detalle/:codigo", component: NoticiasDetalleComponent, canActivate:[Proteccion3Guard]},
  {path:"noticias/agregar", component: NoticiasDetalleComponent, canActivate:[Proteccion3Guard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
