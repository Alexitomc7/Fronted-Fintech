import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service';
import { EstudianteDTO } from '../../models/estudiantedto';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  estudiante: EstudianteDTO | undefined;

  constructor(
    private estudiantesService: EstudiantesService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const id = this.usuarioService.getId();
    if (id) {
      this.estudiantesService.getEstudianteById(Number(id)).subscribe(data => {
        this.estudiante = data;
      });
    }
  }

  editarEstudiante() {
    // Implementar lógica de edición
  }
}

