import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carreras } from '../models/carreras';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  ruta_servidor:string = "http://localhost:8080/api";
  recurso:string ="carreras";

  constructor(private HttpClient:HttpClient) { }

  listaCarreras(){
    return this.HttpClient.get<Carreras[]>("http://localhost:8080/api/carreras");
  }
}
