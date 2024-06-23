import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Carreras } from '../../../models/carreras';
import { MatPaginator } from '@angular/material/paginator';
import { CarrerasService } from '../../../services/carreras.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-carreras-lista',
  templateUrl: './carreras-lista.component.html',
  styleUrl: './carreras-lista.component.css'
})

export class CarrerasListaComponent {
  dxLista=new MatTableDataSource<Carreras>();
  listaResultante:any;
  displayedColumns: string[]=["id","nombre","duracion","modalidad","universidad","facultad"];
  @ViewChild("paginator") paginator!: MatPaginator;

  constructor(private carrerasService:CarrerasService, private _snackBar: MatSnackBar, private dialogos: MatDialog){}

  ngOnInit(){
    this.cargaListaCarreras();
    //this.dsLista.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dxLista.filter = filterValue.trim().toLowerCase();
  }


  cargaListaCarreras(){
    this.carrerasService.listaCarreras().subscribe({
      next: (data:Carreras[])=>{
        this.dxLista = new MatTableDataSource(data);
        //this.dsLista.paginator = this.paginator;
      },
      error: (err)=>{
        console.log(err);
      }

    })

  }
}