import { Injectable } from '@angular/core';
import { Token } from '../models/token';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  ruta_servidor: string = "http://localhost:8080/api";
  recurso: string = "users";

  constructor(private clienteHTTP: HttpClient) { }
  
  listaUsuario() {
    return this.clienteHTTP.get<Usuario[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  detalleUsuario(id: number) {
    return this.clienteHTTP.get<Usuario>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  actualizaUsuario(usuario: Usuario) {
    return this.clienteHTTP.put<Usuario>(`${this.ruta_servidor}/${this.recurso}/${usuario.id}`, usuario);
  }

  registraUsuario(usuario: Usuario) {
    return this.clienteHTTP.post<Usuario>(`${this.ruta_servidor}/${this.recurso}/register`, usuario);
  }

  eliminaUsuario(id: number) {
    return this.clienteHTTP.delete<Usuario>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  logearUsuario(usuario: Usuario) {
    return this.clienteHTTP.post<Token>(`${this.ruta_servidor}/${this.recurso}/login`, usuario).pipe(
      tap((data: Token) => {
        localStorage.setItem("jwtToken", data.jwtToken);
        localStorage.setItem("id", data.id.toString());
        localStorage.setItem("authorities", data.authorities);
      })
    );
  }

  deslogearUsuario() {
    localStorage.clear();
  }

  getId() {
    return localStorage.getItem("id");
  }

  getToken() {
    return localStorage.getItem("jwtToken");
  }

  getAuthorities() {
    return localStorage.getItem("authorities");
  }
}
