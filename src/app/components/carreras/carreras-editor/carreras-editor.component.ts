import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Carreras } from '../../../models/carreras';
import { CarrerasService } from '../../../services/carreras.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-carreras-editor',
  templateUrl: './carreras-editor.component.html',
  styleUrls: ['./carreras-editor.component.css']
})
export class CarrerasEditorComponent implements OnInit {
  dsLista = new MatTableDataSource<Carreras>();
  displayedColumns: string[] = ['id', 'nombre', 'description', 'summary', 'duracion', 'modalidad', 'universidad', 'facultad', 'photoCareer', 'photoProfesional', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private carrerasService: CarrerasService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarCarreras();
  }

  cargarCarreras(): void {
    this.carrerasService.listaCarreras().subscribe({
      next: (data: Carreras[]) => {
        this.dsLista.data = data;
        this.dsLista.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('Error al cargar las carreras', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsLista.filter = filterValue.trim().toLowerCase();
  }

  eliminarCarrera(carrera: Carreras): void {
    if (confirm(`¿Estás seguro de que quieres eliminar la carrera ${carrera.nombre}?`)) {
      this.carrerasService.eliminaCarreras(carrera.id).subscribe({
        next: () => {
          this._snackBar.open('Carrera eliminada exitosamente', 'Cerrar', { duration: 3000 });
          this.cargarCarreras();
        },
        error: () => {
          this._snackBar.open('Error al eliminar la carrera', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
