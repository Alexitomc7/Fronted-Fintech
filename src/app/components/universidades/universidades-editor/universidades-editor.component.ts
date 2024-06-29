import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Universidades } from '../../../models/universidades';
import { MatPaginator } from '@angular/material/paginator';
import { UniversidadesService } from '../../../services/universidades.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmacionService } from '../../../services/confirmacion.service';

@Component({
  selector: 'app-universidades-editor',
  templateUrl: './universidades-editor.component.html',
  styleUrls: ['./universidades-editor.component.css']
})
export class UniversidadesEditorComponent {
  dsLista = new MatTableDataSource<Universidades>();
  displayedColumns: string[] = ["id", "nombre", "photoLogo", "photoFachada", "resumen", "direccion", "paginaweb", "email", "telefono", "descripcion", "ubicacion", "tipo", "ranking", "fundacion", "rector", "acciones"];
  @ViewChild("paginator") paginator!: MatPaginator;

  constructor(
    private universidadesService: UniversidadesService,
    private _snackBar: MatSnackBar,
    private dialogos: MatDialog,
    private confirmacionService: ConfirmacionService 
  ) { }

  ngOnInit() {
    this.cargaListaUniversidades();
    this.dsLista.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsLista.filter = filterValue.trim().toLowerCase();
  }

  eliminarUniversidad(universidad: Universidades) {
    this.confirmacionService.confirmarAccion('¿Está seguro de eliminar la universidad?', universidad.nombre).subscribe(result => {
      if (result) {
        this.universidadesService.eliminaUniversidades(universidad.id).subscribe({
          next: () => {
            this.cargaListaUniversidades();
            this._snackBar.open("Universidad eliminada exitosamente", "Ok", { duration: 3000 });
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 500) {
              this._snackBar.open("La universidad tiene relaciones vigentes con otras fuentes de información", "Ok");
            } else {
              console.error(err);
              this._snackBar.open("Error al eliminar la universidad", "Ok");
            }
          }
        });
      }
    });
  }

  cargaListaUniversidades() {
    this.universidadesService.listaUniversidades().subscribe({
      next: (data: Universidades[]) => {
        this.dsLista = new MatTableDataSource(data);

        data.forEach((uni: Universidades) => {
          uni.photoLogo = "data:image/jpeg;base64, " + uni.photoLogo;
          uni.photoFachada = "data:image/jpeg;base64, " + uni.photoFachada;
        });

        this.dsLista.paginator = this.paginator; 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
