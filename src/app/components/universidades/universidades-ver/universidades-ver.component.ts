import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Universidades } from '../../../models/universidades';
import { UniversidadesService } from '../../../services/universidades.service';

@Component({
  selector: 'app-universidades-ver',
  templateUrl: './universidades-ver.component.html',
  styleUrls: ['./universidades-ver.component.css']
})
export class UniversidadesVerComponent implements OnInit {
  universidad: Universidades | undefined;

  constructor(
    private route: ActivatedRoute,
    private universidadesService: UniversidadesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.universidadesService.getUniversidadById(Number(id)).subscribe(
        data => {
          this.universidad = data;

          // Convertir las imágenes de base64
          if (this.universidad.photoLogo) {
            this.universidad.photoLogo = "data:image/jpeg;base64, " + this.universidad.photoLogo;
          }
          if (this.universidad.photoFachada) {
            this.universidad.photoFachada = "data:image/jpeg;base64, " + this.universidad.photoFachada;
          }
          console.log('Photo Logo URL:', this.universidad.photoLogo);
          console.log('Photo Fachada URL:', this.universidad.photoFachada);
        },
        error => console.error(error)
      );
    }
  }
}

