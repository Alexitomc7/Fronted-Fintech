import { Component, OnInit } from '@angular/core';
import { Carreras } from '../../../models/carreras';
import { CarrerasService } from '../../../services/carreras.service';

@Component({
  selector: 'app-carreras-lista',
  templateUrl: './carreras-lista.component.html',
  styleUrls: ['./carreras-lista.component.css']
})
export class CarrerasListaComponent implements OnInit {
  carreras: Carreras[] = [];
  filteredCarreras: Carreras[] = [];
  searchText: string = '';
  filterCategory: string = '';
  errorMessage: any;

  constructor(private carrerasService: CarrerasService) { }

  ngOnInit(): void {
    this.carrerasService.listaCarreras().subscribe(
      (data: Carreras[]) => {
        this.carreras = data;
        this.filteredCarreras = data;
      },
      (error) => {
        console.error('Error fetching data', error);
        this.errorMessage = 'Error fetching data';
      }
    );
  }

  applyFilter(): void {
    this.filteredCarreras = this.carreras.filter(carrera => {
      return (
        (!this.searchText || carrera.nombre.toLowerCase().includes(this.searchText.toLowerCase())) &&
        (!this.filterCategory || carrera.facultad === this.filterCategory)
      );
    });
  }
}


