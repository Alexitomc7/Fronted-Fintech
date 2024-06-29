import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from '../../../services/noticias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Noticias } from '../../../models/noticias';
import { ServerError } from '../../../models/server-error';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmaComponent } from '../../confirma/confirma.component';

@Component({
  selector: 'app-noticias-detalle',
  templateUrl: './noticias-detalle.component.html',
  styleUrl: './noticias-detalle.component.css'
})
export class NoticiasDetalleComponent {

  idNoticias:number=0;
  detalleForm!:FormGroup;
  noExiste:boolean=false;
  fotoImageNoti:any=null;

  constructor(
    private ruta: ActivatedRoute,
    private noticiasService: NoticiasService,
    private formBuilder: FormBuilder,
    private enrutador: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog // Inyecta MatDialog para mostrar el cuadro de diálogo de confirmación
  ) {}


  ngOnInit(){
    this.cargaNoticias();
  }
  
  seleccionaFotoImage(event:any){
    this.fotoImageNoti = event.target.files[0];
    console.log(this.fotoImageNoti);
  } 


  grabarNoticias() {
    const noticias: Noticias = {
      id: parseInt(this.detalleForm.get("idNoti")!.value),
      titulo: this.detalleForm.get("tituloNoti")!.value,
      photoImage: null,
      contenido: this.detalleForm.get("contenidoNoti")!.value,
      fecha: this.detalleForm.get("fechaNoti")!.value,
      tipo: this.detalleForm.get("tipoNoti")!.value,
    };
  
    this.confirmarOperacion(this.idNoticias !== 0 ? 'Actualizar' : 'Agregar')
      .subscribe((result) => {
        if (result) {
          if (this.idNoticias !== 0) {
            this.actualizarNoticia(noticias);
          } else {
            this.agregarNoticia(noticias);
          }
        }
      });
  }
  
  private actualizarNoticia(noticias: Noticias) {
    this.noticiasService.actualizaNoticia(noticias).subscribe({
      next: (data: Noticias) => {
        const fotoImageFormData = new FormData();
        fotoImageFormData.append("photo_image", this.fotoImageNoti, this.fotoImageNoti.name);
  
        this.noticiasService.actualizaFotoImage(data.id, fotoImageFormData).subscribe({
          next: () => {
            this._snackBar.open("Se grabó la foto de la noticia", "Ok", { duration: 1000 });
            this.enrutador.navigate(["/noticias/lista"]);
          },
          error: (err) => {
            this._snackBar.open("No se grabó la foto: " + err.error.message, "Ok", { duration: 2000 });
          }
        });
  
        this._snackBar.open("La noticia se actualizó", "Ok", { duration: 1000 });
        this.enrutador.navigate(["/noticias/lista"]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  private agregarNoticia(noticias: Noticias) {
    this.noticiasService.registraNoticia(noticias).subscribe({
      next: (data: Noticias) => {
        const fotoImageFormData = new FormData();
        fotoImageFormData.append("photo_image", this.fotoImageNoti, this.fotoImageNoti.name);
  
        this.noticiasService.actualizaFotoImage(data.id, fotoImageFormData).subscribe({
          next: () => {
            this._snackBar.open("Se grabó la foto de la noticia", "Ok", { duration: 1000 });
            this.enrutador.navigate(["/noticias/lista"]);
          },
          error: (err) => {
            this._snackBar.open("No se grabó la foto: " + err.error.message, "Ok", { duration: 2000 });
          }
        });
  
        this._snackBar.open("La noticia se registró", "Ok", { duration: 1000 });
        this.enrutador.navigate(["/noticias/lista"]);
      },
      error: (err) => {
        this._snackBar.open("No se registró la noticia: " + err.error.message, "Ok", { duration: 2000 });
      }
    });
  }
  
  confirmarOperacion(operacion: string) {
    const dialogRef = this.dialog.open(ConfirmaComponent, {
      width: '300px',
      data: { titulo: 'Confirmacion de operacion', mensaje: '¿Estás seguro que deseas grabar la noticia?' }
    });
  
    return dialogRef.afterClosed();
  }

  cargaNoticias(){

    this.detalleForm = this.formBuilder.group({
      idNoti:[""],
      tituloNoti:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      contenidoNoti:["",[Validators.required, Validators.maxLength(100), Validators.minLength(1)]],
      fechaNoti:["",[Validators.required, Validators.maxLength(100), Validators.minLength(1)]],
      tipoNoti:["",[Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
    });

    this.idNoticias = this.ruta.snapshot.params["codigo"];


    if(this.idNoticias!=0 && this.idNoticias!=undefined) {

      this.noticiasService.detalleNoticia(this.idNoticias).subscribe({

        next: (data:Noticias)=> {

          this.detalleForm.get("idNoti")?.setValue(data.id);
          this.detalleForm.get("tituloNoti")?.setValue(data.titulo);
          this.detalleForm.get("contenidoNoti")?.setValue(data.contenido);
          this.detalleForm.get("fechaNoti")?.setValue(data.fecha);
          this.detalleForm.get("tipoNoti")?.setValue(data.tipo);

        },
        error: (err:ServerError)=> {
          if (err.status==404) {
            this.noExiste=true;
          }
          console.log(err);
        }
      });

    } else {
      this.idNoticias=0;
      this.detalleForm.get("idNoti")?.setValue(this.idNoticias);

    }

 }
 }