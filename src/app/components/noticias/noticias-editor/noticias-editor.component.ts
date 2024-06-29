import { Component } from '@angular/core';
import { Noticias } from '../../../models/noticias';
import { MatTableDataSource } from '@angular/material/table';
import { NoticiasService } from '../../../services/noticias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmaComponent } from '../../confirma/confirma.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-noticias-editor',
  templateUrl: './noticias-editor.component.html',
  styleUrl: './noticias-editor.component.css'
})
export class NoticiasEditorComponent {
  dsListaNoticias=new MatTableDataSource<Noticias>();
  listaResultante:any;

  displayedColumns: string[]=["id","titulo","photoImage","contenido","fecha","tipo","acciones"];


  constructor(private noticiasService:NoticiasService, private _snackBar: MatSnackBar, private dialogos: MatDialog){}

  ngOnInit(){
    this.cargaListaNoticias();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsListaNoticias.filter = filterValue.trim().toLowerCase();
  }


  eliminarNoticia(noticias: Noticias) {
    console.log(noticias);
    let id = noticias.id;
    const confirmarEliminacion = this.dialogos.open(ConfirmaComponent, {
      data: { 
        tipo: "Noticias", 
        item: noticias.titulo,
        mensaje: "¿Estás seguro de eliminar esta noticia?" 
      }
    });
  
    confirmarEliminacion.afterClosed().subscribe(result => {
      if (result) {
        this.noticiasService.eliminaNoticia(id).subscribe({
          next: () => {
            this.cargaListaNoticias();
          },
          error: (err: HttpErrorResponse) => {
            if (err.error.status == 500) {
              this._snackBar.open("La Noticia tiene relaciones vigentes con otras fuentes de información", "Ok");
            }
            console.log(err);
          }
        });
      }
    });
  }

  cargaListaNoticias(){
    this.noticiasService.listaNoticias().subscribe({
        next: (data:Noticias[])=>{
            this.dsListaNoticias = new MatTableDataSource(data);
            
            data.forEach((noti: Noticias) => {
              noti.photoImage = "data:image/jpeg;base64, " + noti.photoImage;
            })

            
        },
        error: (err)=>{
          console.log(err);
        }
    })
  }
}
