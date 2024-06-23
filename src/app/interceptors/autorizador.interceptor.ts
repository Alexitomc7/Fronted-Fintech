import { Injectable } from '@angular/core';
import { UsuarioService } from './../services/usuario.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutorizadorInterceptor implements HttpInterceptor {

  constructor (private usuarioService:UsuarioService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.usuarioService.getToken();
    if (token) {
      let copiaRequest = req.clone({
        headers: req.headers.set("Authorization","Bearer "+token)
      });
      return next.handle(copiaRequest);
    }
    return next.handle(req);
  }

}