import { Component, OnInit } from '@angular/core';
import { Universidades } from '../../../models/universidades';
import { UniversidadesService } from '../../../services/universidades.service';

@Component({
  selector: 'app-universidades-lista',
  templateUrl: './universidades-lista.component.html',
  styleUrls: ['./universidades-lista.component.css']
})
export class UniversidadesListaComponent implements OnInit {
  universidades: Universidades[] = [];
  filteredUniversidades: Universidades[] = [];
  searchText: string = '';
  filterType: string = '';
  errorMessage: any;

  constructor(private universidadesService: UniversidadesService) { }

  ngOnInit(): void {
    this.universidadesService.listaUniversidades().subscribe(
      (data: Universidades[]) => {
        this.universidades = data;
        this.filteredUniversidades = data;
      },
      (error) => {
        console.error('Error fetching data', error);
        this.errorMessage = 'Error fetching data';
      }
    );
  }

  applyFilter(): void {
    this.filteredUniversidades = this.universidades.filter(universidad => {
      return (
        (!this.searchText || universidad.nombre.toLowerCase().includes(this.searchText.toLowerCase())) &&
        (!this.filterType || universidad.tipo === this.filterType)
      );
    });
  }
}
