import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LogeoComponent } from './components/logeo/logeo.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UniversidadesListaComponent } from './components/universidades/universidades-lista/universidades-lista.component';
import { UniversidadesDetalleComponent } from './components/universidades/universidades-detalle/universidades-detalle.component';
import { CarrerasListaComponent } from './components/carreras/carreras-lista/carreras-lista.component';
import { CarrerasDetalleComponent } from './components/carreras/carreras-detalle/carreras-detalle.component';
import { proteccion1Guard } from './guards/proteccion1.guard';
import { Proteccion2Guard} from './guards/proteccion2.guard';
import { Proteccion3Guard } from './guards/proteccion3.guard';


const routes: Routes = [
  {path:"", component:LandingPageComponent},
  {path:"registro", component:RegistroComponent},
  {path:"logeo", component: LogeoComponent},
  {path:"inicio", component: InicioComponent, canActivate:[proteccion1Guard]},
  {path:"universidades/lista", component: UniversidadesListaComponent, canActivate:[Proteccion2Guard]},
  {path:"universidades/detalle", component: UniversidadesDetalleComponent, canActivate:[Proteccion3Guard]},
  {path:"carreras/lista", component: CarrerasListaComponent, canActivate:[Proteccion2Guard]},
  {path:"carreras/detalle", component: CarrerasDetalleComponent, canActivate:[Proteccion3Guard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
