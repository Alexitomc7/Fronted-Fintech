import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Universidades } from '../../../models/universidades';
import { MatPaginator } from '@angular/material/paginator';
import { UniversidadesService } from '../../../services/universidades.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-universidades-lista',
  templateUrl: './universidades-lista.component.html',
  styleUrl: './universidades-lista.component.css'
})
export class UniversidadesListaComponent {
  dsLista=new MatTableDataSource<Universidades>();
  listaResultante:any;
  displayedColumns: string[]=["id","nombre","direccion","paginaweb","email","telefono","descripcion","ubicacion","tipo","ranking","fundacion","rector"];
  @ViewChild("paginator") paginator!: MatPaginator;

  constructor(private universidadesService:UniversidadesService, private _snackBar: MatSnackBar, private dialogos: MatDialog){}

  ngOnInit(){
    this.cargaListaUniversidades();
    //this.dsLista.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsLista.filter = filterValue.trim().toLowerCase();
  }


  cargaListaUniversidades(){
    this.universidadesService.listaUniversidades().subscribe({
      next: (data:Universidades[])=>{
        this.dsLista = new MatTableDataSource(data);
        //this.dsLista.paginator = this.paginator;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
