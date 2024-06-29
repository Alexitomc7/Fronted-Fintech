import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carreras } from '../models/carreras';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  ruta_servidor:string = "http://localhost:8080/api";
  recurso:string ="carreras";

  constructor(private clienteHTTP:HttpClient) { }

  listaCarreras(){
    return this.clienteHTTP.get<Carreras[]>("http://localhost:8080/api/carreras");
  }
  detalleCarreras(id:number){
    return this.clienteHTTP.get<Carreras>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaCarreras(carreras: Carreras){
    return this.clienteHTTP.put<Carreras>(this.ruta_servidor+"/"+this.recurso+"/"+carreras.id.toString(),carreras);
  }

  registraCarreras(carreras: Carreras){
    return this.clienteHTTP.post<Carreras>(this.ruta_servidor+"/"+this.recurso,carreras);
  }

  eliminaCarreras(id:number){
    return this.clienteHTTP.delete<Carreras>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaFotoProfesional(id:number, photo_careers: FormData){
    return this.clienteHTTP.put<Carreras>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString()+"/"+"photo_logo",photo_careers);
  }
  
  actualizaFotoCareer(id:number, photo_profesionals: FormData){
    return this.clienteHTTP.put<Carreras>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString()+"/"+"photo_fachada",photo_profesionals);
  }

  getCarreraById(id: number): Observable<Carreras> {
    return this.clienteHTTP.get<Carreras>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }
}
