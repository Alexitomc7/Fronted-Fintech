import { Injectable } from '@angular/core';
import { UsuarioService } from './../services/usuario.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Proteccion2Guard {

  constructor (private usuarioService:UsuarioService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (this.usuarioService.getAuthorities()!.indexOf("ROLE_STUDENT")>=0
            ||
            this.usuarioService.getAuthorities()!.indexOf("ROLE_UNIVERSITARIO")>=0
            ||
            this.usuarioService.getAuthorities()!.indexOf("ROLE_ADMIN")>=0
          );  
  };
}