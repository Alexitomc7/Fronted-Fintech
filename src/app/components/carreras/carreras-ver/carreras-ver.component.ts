import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrerasService } from '../../../services/carreras.service';
import { Carreras } from '../../../models/carreras';

@Component({
  selector: 'app-carreras-ver',
  templateUrl: './carreras-ver.component.html',
  styleUrl: './carreras-ver.component.css'
})
export class CarrerasVerComponent implements OnInit {
  carrera: Carreras | undefined;

  constructor(
    private route: ActivatedRoute,
    private carrerasService: CarrerasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.carrerasService.getCarreraById(Number(id)).subscribe(
      data => this.carrera = data,
      error => console.error(error)
    );
  }
}
