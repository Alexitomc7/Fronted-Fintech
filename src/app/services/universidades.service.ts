import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Universidades } from '../models/universidades';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversidadesService {

  ruta_servidor:string = "http://localhost:8080/api";
  recurso:string ="universidades";

  constructor(private clienteHTTP:HttpClient) { }

  listaUniversidades(){
    return this.clienteHTTP.get<Universidades[]>(this.ruta_servidor+"/"+this.recurso);
  }

  detalleUniversidades(id:number){
    return this.clienteHTTP.get<Universidades>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaUniversidades(universidades: Universidades){
    return this.clienteHTTP.put<Universidades>(this.ruta_servidor+"/"+this.recurso+"/"+universidades.id.toString(),universidades);
  }

  registraUniversidades(universidades: Universidades){
    return this.clienteHTTP.post<Universidades>(this.ruta_servidor+"/"+this.recurso,universidades);
  }

  eliminaUniversidades(id:number){
    return this.clienteHTTP.delete<Universidades>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaFotoLogo(id:number, photo_logos: FormData){
    return this.clienteHTTP.put<Universidades>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString()+"/"+"photo_logo",photo_logos);
  }
  
  actualizaFotoFachada(id:number, photo_fachadas: FormData){
    return this.clienteHTTP.put<Universidades>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString()+"/"+"photo_fachada",photo_fachadas);
  }

  getUniversidadById(id: number): Observable<Universidades> {
    return this.clienteHTTP.get<Universidades>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }
}
