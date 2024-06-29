import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoticiasService } from '../../../services/noticias.service';
import { Noticias } from '../../../models/noticias';
@Component({
  selector: 'app-noticias-lista',
  templateUrl: './noticias-lista.component.html',
  styleUrl: './noticias-lista.component.css'
})
export class NoticiasListaComponent implements OnInit {
  noticias: Noticias[] = [];
  errorMessage: any;
  constructor(private noticiasService: NoticiasService) { }

  ngOnInit(): void {
    this.noticiasService.listaNoticias().subscribe(
      (data: Noticias[]) => {
        this.noticias = data;

        // Convertir imágenes de base64
        this.noticias.forEach(noticia => {
          if (noticia.photoImage) {
            noticia.photoImage = 'data:image/jpeg;base64,' + noticia.photoImage;
          }
        });
      },
      (error) => {
        console.error('Error fetching data', error);
        this.errorMessage = 'Error fetching data';
      }
    );
  }
}
