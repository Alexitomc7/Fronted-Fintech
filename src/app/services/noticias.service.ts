import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noticias } from '../models/noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  ruta_servidor:string = "http://localhost:8080/api";
  recurso:string ="noticias";

  constructor(private clienteHTTP:HttpClient) { }


  listaNoticias(){
    return this.clienteHTTP.get<Noticias[]>(this.ruta_servidor+"/"+this.recurso);
  }

  detalleNoticia(id:number){
    return this.clienteHTTP.get<Noticias>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaNoticia(noticias: Noticias){
    return this.clienteHTTP.put<Noticias>(this.ruta_servidor+"/"+this.recurso+"/"+noticias.id.toString(),noticias);
  }

  registraNoticia(noticias: Noticias){
    return this.clienteHTTP.post<Noticias>(this.ruta_servidor+"/"+this.recurso,noticias);
  }

  eliminaNoticia(id:number){
    return this.clienteHTTP.delete<Noticias>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  actualizaFotoImage(id:number, photo_images: FormData){
    return this.clienteHTTP.put<Noticias>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString()+"/"+"photo_image",photo_images);
  }

}