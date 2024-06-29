import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UniversidadesService } from '../../../services/universidades.service';
import { Universidades } from '../../../models/universidades';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerError } from '../../../models/server-error';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmaComponent } from '../../confirma/confirma.component';

@Component({
  selector: 'app-universidades-detalle',
  templateUrl: './universidades-detalle.component.html',
  styleUrl: './universidades-detalle.component.css'
})

export class UniversidadesDetalleComponent {
  idUniversidades:number=0;
  detalleForm!:FormGroup;
  noExiste:boolean=false;
  fotoLogoUni:any=null;
  fotoFachadaUni:any=null; 

  constructor (
    private ruta: ActivatedRoute, 
    private universidadesService: UniversidadesService,
    private formBuilder: FormBuilder, 
    private enrutador: Router, 
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  

  ngOnInit(){
    this.cargaUniversidades();
  }

  seleccionaFotoLogo(event:any){
    this.fotoLogoUni = event.target.files[0];
    console.log(this.fotoLogoUni);
  }

  seleccionaFotoFachada(event: any) {
    this.fotoFachadaUni = event.target.files[0];
    console.log(this.fotoFachadaUni);
  }


  grabarUniversidades(){
    const universidades: Universidades = {
      id: parseInt(this.detalleForm.get("idUni")!.value),
      nombre: this.detalleForm.get("nombreUni")!.value,
      photoLogo: null,
      photoFachada: null,
      resumen: this.detalleForm.get("resumenUni")!.value,
      direccion: this.detalleForm.get("direccionUni")!.value,
      paginaweb: this.detalleForm.get("paginawebUni")!.value,
      email: this.detalleForm.get("emailUni")!.value,
      telefono: parseInt(this.detalleForm.get("telefonoUni")!.value),
      descripcion: this.detalleForm.get("descripcionUni")!.value,
      ubicacion: this.detalleForm.get("ubicacionUni")!.value,
      tipo: this.detalleForm.get("tipoUni")!.value,
      ranking: this.detalleForm.get("rankingUni")!.value,
      fundacion: this.detalleForm.get("fundacionUni")!.value,
      rector: this.detalleForm.get("rectorUni")!.value,
    };
  
    if (this.idUniversidades != 0) {
      this.universidadesService.actualizaUniversidades(universidades).subscribe({
        next: (data: Universidades) => {
          const fotoLogoFormData = new FormData();
          fotoLogoFormData.append("photo_logo", this.fotoLogoUni, this.fotoLogoUni.name);
  
          this.universidadesService.actualizaFotoLogo(data.id, fotoLogoFormData).subscribe({
            next: () => {
              const fotoFachadaFormData = new FormData();
              fotoFachadaFormData.append("photo_fachada", this.fotoFachadaUni, this.fotoFachadaUni.name);
  
              this.universidadesService.actualizaFotoFachada(data.id, fotoFachadaFormData).subscribe({
                next: () => {
                  this._snackBar.open("Se grabó la foto de fachada", "Ok", { duration: 1000 });
                  this.enrutador.navigate(["/universidades/lista"]);
                },
                error: (err) => {
                  this._snackBar.open("No se grabó la foto de fachada: " + err.error.message, "Ok", { duration: 2000 });
                }
              });
  
              this._snackBar.open("Se grabó la foto del logo", "Ok", { duration: 1000 });
              this.enrutador.navigate(["/universidades/lista"]);
            },
            error: (err) => {
              this._snackBar.open("No se grabó la foto del logo: " + err.error.message, "Ok", { duration: 2000 });
            }
          });
  
          this._snackBar.open("La universidad se actualizó", "Ok", { duration: 1000 });
          this.enrutador.navigate(["/universidades/lista"]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } 
    else {
      this.universidadesService.registraUniversidades(universidades).subscribe({
        next: (data: Universidades) => {
          const fotoLogoFormData = new FormData();
          fotoLogoFormData.append("photo_logo", this.fotoLogoUni, this.fotoLogoUni.name);
  
          this.universidadesService.actualizaFotoLogo(data.id, fotoLogoFormData).subscribe({
            next: () => {
              const fotoFachadaFormData = new FormData();
              fotoFachadaFormData.append("photo_fachada", this.fotoFachadaUni, this.fotoFachadaUni.name);
  
              this.universidadesService.actualizaFotoFachada(data.id, fotoFachadaFormData).subscribe({
                next: () => {
                  this._snackBar.open("Se grabó la foto de fachada", "Ok", { duration: 1000 });
                  this.enrutador.navigate(["/universidades/lista"]);
                },
                error: (err) => {
                  this._snackBar.open("No se grabó la foto de fachada: " + err.error.message, "Ok", { duration: 2000 });
                }
              });
  
              this._snackBar.open("Se grabó la foto del logo", "Ok", { duration: 1000 });
              this.enrutador.navigate(["/universidades/lista"]);
            },
            error: (err) => {
              this._snackBar.open("No se grabó la foto del logo: " + err.error.message, "Ok", { duration: 2000 });
            }
          });
  
          this._snackBar.open("La universidad se registró", "Ok", { duration: 1000 });
          this.enrutador.navigate(["/universidades/lista"]);
        },
        error: (err) => {
          this._snackBar.open("No se registró la universidad: " + err.error.message, "Ok", { duration: 2000 });
        }
      });
    }
  }

  confirmarAgregarUniversidad() {
    const dialogRef = this.dialog.open(ConfirmaComponent, {
      width: '400px',
      data: { mensaje: '¿Estás seguro de que quieres grabar universidad?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.grabarUniversidades();
      }
    });
  }
  
  confirmarActualizarUniversidad() {
    const dialogRef = this.dialog.open(ConfirmaComponent, {
      width: '250px',
      data: { mensaje: '¿Estás seguro de que quieres grabar esta universidad?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.grabarUniversidades();
      }
    });
  }

  cargaUniversidades() {

    this.detalleForm = this.formBuilder.group({
      idUni:[""],
      nombreUni:["",[Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      resumenUni:["",[Validators.required, Validators.maxLength(225), Validators.minLength(5)]],
      direccionUni:["",[Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
      paginawebUni:["",[Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
      emailUni:["",[Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      telefonoUni: ["",[Validators.required, Validators.maxLength(11), Validators.minLength(9)]],
      descripcionUni:["",[Validators.required, Validators.maxLength(225), Validators.minLength(5)]],
      ubicacionUni:["",[Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
      tipoUni:["",[Validators.required, Validators.maxLength(7), Validators.minLength(7)]],
      rankingUni:["",[Validators.required, Validators.maxLength(3), Validators.minLength(1)]],
      fundacionUni:["",[Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      rectorUni:["",[Validators.required, Validators.maxLength(50), Validators.minLength(5)]]
    });


    this.idUniversidades = this.ruta.snapshot.params["codigo"];
   
    if(this.idUniversidades!=0 && this.idUniversidades!=undefined) {
      this.universidadesService.detalleUniversidades(this.idUniversidades).subscribe({
        next: (data:Universidades)=> {
          
          this.detalleForm.get("idUni")?.setValue(data.id);
          this.detalleForm.get("nombreUni")?.setValue(data.nombre);
          this.detalleForm.get("resumenUni")?.setValue(data.resumen);
          this.detalleForm.get("direccionUni")?.setValue(data.direccion);
          this.detalleForm.get("paginawebUni")?.setValue(data.paginaweb);
          this.detalleForm.get("emailUni")?.setValue(data.email);
          this.detalleForm.get("telefonoUni")?.setValue(data.telefono);
          this.detalleForm.get("descripcionUni")?.setValue(data.descripcion);
          this.detalleForm.get("ubicacionUni")?.setValue(data.ubicacion);
          this.detalleForm.get("tipoUni")?.setValue(data.tipo);
          this.detalleForm.get("rankingUni")?.setValue(data.ranking);
          this.detalleForm.get("fundacionUni")?.setValue(data.fundacion);
          this.detalleForm.get("rectorUni")?.setValue(data.rector);
        },
        error: (err:ServerError)=> {
          if (err.status==404) {
            this.noExiste=true;
          }
          console.log(err);
        }
      });
    } else {
      this.idUniversidades=0;
      this.detalleForm.get("idUni")?.setValue(this.idUniversidades);
    }


  }
}