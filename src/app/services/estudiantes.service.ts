import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudianteDTO } from '../models/estudiantedto';


@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private ruta_servidor: string = "http://localhost:8080/api";
  private recurso: string = "estudiantes";

  constructor(private httpClient: HttpClient) {}

  listaEstudiantes(): Observable<EstudianteDTO[]> {
    return this.httpClient.get<EstudianteDTO[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  getEstudianteById(id: number): Observable<EstudianteDTO> {
    return this.httpClient.get<EstudianteDTO>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  actualizarEstudiante(estudiante: EstudianteDTO): Observable<EstudianteDTO> {
    return this.httpClient.put<EstudianteDTO>(`${this.ruta_servidor}/estudiantes/${estudiante.id}`,estudiante);
  }
}       