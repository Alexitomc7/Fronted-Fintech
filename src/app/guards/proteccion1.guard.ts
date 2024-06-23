import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class proteccion1Guard{

  constructor (private usuarioService:UsuarioService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return (this.usuarioService.getId()!=null);
  
  };
}