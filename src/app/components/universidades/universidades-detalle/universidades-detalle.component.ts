import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UniversidadesService } from '../../../services/universidades.service';
import { error } from 'console';
import { Universidades } from '../../../models/universidades';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerError } from '../../../models/server-error';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-universidades-detalle',
  templateUrl: './universidades-detalle.component.html',
  styleUrl: './universidades-detalle.component.css'
})

export class UniversidadesDetalleComponent {
  idUniversidades:number=0;
  detalleForm!:FormGroup;
  noExiste:boolean=false;

  constructor (private ruta:ActivatedRoute, private universidadesService:UniversidadesService,
                private formBuilder:FormBuilder, private enrutador:Router, 
                private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.cargaUniversidades();
  }

  grabarUniversidades(){
    const universidades:Universidades={
      id: parseInt(this.detalleForm.get("idUni")!.value),
      nombre: this.detalleForm.get("nombreUni")!.value,
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

    if (this.idUniversidades!=0) {

      this.universidadesService.actualizaUniversidades(universidades).subscribe({
        next:()=>{
          this._snackBar.open("El universidades se actualizó","Ok",{duration: 1000 });
          this.enrutador.navigate(["/universidades/lista"]);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    } else {
      this.universidadesService.registraUniversidades(universidades).subscribe({
        next:()=>{
          this._snackBar.open("El universidades se registró","Ok",{duration: 1000 });
          this.enrutador.navigate(["/universidades/lista"]);
        },
        error:(err)=>{          
          this._snackBar.open("No se registró al universidades: "+err.error.message,"Ok",{duration: 2000 });          
        }
      });
    }
  }

  cargaUniversidades() {

    this.detalleForm = this.formBuilder.group({
      idUni:[""],
      nombreUni:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      direccionUni:["",[Validators.required, Validators.maxLength(100), Validators.minLength(1)]],
      paginawebUni:["",[Validators.required, Validators.min(0.1)]],
      emailUni:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      telefonoUni: ["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      descripcionUni:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      ubicacionUni:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      tipoUni:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      rankingUni:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      fundacionUni:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      rectorUni:["",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]]
    });


    this.idUniversidades = this.ruta.snapshot.params["codigo"];
   
    if(this.idUniversidades!=0 && this.idUniversidades!=undefined) {
      this.universidadesService.detalleUniversidades(this.idUniversidades).subscribe({
        next: (data:Universidades)=> {
          
          this.detalleForm.get("idUni")?.setValue(data.id);
          this.detalleForm.get("nombreUni")?.setValue(data.nombre);
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
