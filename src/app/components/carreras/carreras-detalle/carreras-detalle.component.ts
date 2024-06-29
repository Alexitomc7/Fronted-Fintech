import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrerasService } from '../../../services/carreras.service';
import { Carreras } from '../../../models/carreras';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerError } from '../../../models/server-error';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Universidades } from '../../../models/universidades';
import { UniversidadesService } from '../../../services/universidades.service';

@Component({
  selector: 'app-carreras-detalle',
  templateUrl: './carreras-detalle.component.html',
  styleUrl: './carreras-detalle.component.css'
})
export class CarrerasDetalleComponent {
  idCarreras:number=0;
  universidades: Universidades[] = [];
  detalleForm!:FormGroup;
  noExiste:boolean=false;
  fotoCareerCar:any=null;
  fotoProfesionalCar:any=null; 

  constructor (private ruta:ActivatedRoute, private carrerasService:CarrerasService, private universidadesService:UniversidadesService,
                private formBuilder:FormBuilder, private enrutador:Router, 
                private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.cargaCarreras();
    this.cargarUniversidades();
  }

  seleccionaFotoCareer(event: any) {
    this.fotoCareerCar = event.target.files[0];
    console.log(this.fotoCareerCar);
  }

  seleccionaFotoProfesional(event: any) {
    this.fotoProfesionalCar = event.target.files[0];
    console.log(this.fotoProfesionalCar);
  }

  grabarCarreras() {
    const carreras: Carreras = {
      id: parseInt(this.detalleForm.get("id")!.value),
      nombre: this.detalleForm.get("nombre")!.value,
      duracion: this.detalleForm.get("duracion")!.value,
      description: this.detalleForm.get("duracion")!.value,
      summary: this.detalleForm.get("summary")!.value,
      modalidad: this.detalleForm.get("modalidad")!.value,
      universidad: this.detalleForm.get("universidad")!.value,
      facultad: this.detalleForm.get("facultad")!.value,
      photoCareer: null,
      photoProfesional: null
    };

    if (this.idCarreras != 0) {
      this.carrerasService.actualizaCarreras(carreras).subscribe({
        next: (data: Carreras) => {
          const fotoCareerFormData = new FormData();
          fotoCareerFormData.append("photo_career", this.fotoCareerCar, this.fotoCareerCar.name);

          this.carrerasService.actualizaFotoCareer(data.id, fotoCareerFormData).subscribe({
            next: () => {
              const fotoProfesionalFormData = new FormData();
              fotoProfesionalFormData.append("photo_profesional", this.fotoProfesionalCar, this.fotoProfesionalCar.name);

              console.log("Llegó hasta actualiza foto profesional");

              this.carrerasService.actualizaFotoProfesional(data.id, fotoProfesionalFormData).subscribe({
                next: () => {
                  this._snackBar.open("Se grabó la foto del profesional", "Ok", { duration: 1000 });
                  this.enrutador.navigate(["/carreras/lista"]);
                },
                error: (err) => {
                  this._snackBar.open("No se grabó la foto del profesional: " + err.error.message, "Ok", { duration: 2000 });
                }
              });

              this._snackBar.open("Se grabó la foto de la carrera", "Ok", { duration: 1000 });
              this.enrutador.navigate(["/carreras/lista"]);
            },
            error: (err) => {
              this._snackBar.open("No se grabó la foto de la carrera: " + err.error.message, "Ok", { duration: 2000 });
            }
          });

          this._snackBar.open("La carrera se actualizó", "Ok", { duration: 1000 });
          this.enrutador.navigate(["/carreras/lista"]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.carrerasService.registraCarreras(carreras).subscribe({
        next: (data: Carreras) => {
          const fotoCCarFormData = new FormData();
          fotoCCarFormData.append("photo_career", this.fotoCareerCar, this.fotoCareerCar.name);

          this.carrerasService.actualizaFotoCareer(data.id, fotoCCarFormData).subscribe({
            next: () => {
              const fotoProfesionalFormData = new FormData();
              fotoProfesionalFormData.append("photo_profesional", this.fotoProfesionalCar, this.fotoProfesionalCar.name);

              this.carrerasService.actualizaFotoProfesional(data.id, fotoProfesionalFormData).subscribe({
                next: () => {
                  this._snackBar.open("Se grabó la foto del profesional", "Ok", { duration: 1000 });
                  this.enrutador.navigate(["/carreras/lista"]);
                },
                error: (err) => {
                  this._snackBar.open("No se grabó la foto del profesional: " + err.error.message, "Ok", { duration: 2000 });
                }
              });

              this._snackBar.open("Se grabó la foto de la carrera", "Ok", { duration: 1000 });
              this.enrutador.navigate(["/carreras/lista"]);
            },
            error: (err) => {
              this._snackBar.open("No se grabó la foto de la carrera: " + err.error.message, "Ok", { duration: 2000 });
            }
          });

          this._snackBar.open("La carrera se registró", "Ok", { duration: 1000 });
          this.enrutador.navigate(["/carreras/lista"]);
        },
        error: (err) => {
          this._snackBar.open("No se registró la carrera: " + err.error.message, "Ok", { duration: 2000 });
        }
      });
    }
  }

  cargaCarreras() {
    this.detalleForm = this.formBuilder.group({
      id: [""],
      nombre: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      description: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      summary: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      duracion: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(1)]],
      modalidad: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(1)]],
      universidad: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      facultad: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(5)]]
    });

    this.idCarreras = this.ruta.snapshot.params["codigo"];

    if (this.idCarreras != 0 && this.idCarreras != undefined) {
      this.carrerasService.detalleCarreras(this.idCarreras).subscribe({
        next: (data: Carreras) => {
          this.detalleForm.get("id")?.setValue(data.id);
          this.detalleForm.get("nombre")?.setValue(data.nombre);
          this.detalleForm.get("description")?.setValue(data.description);
          this.detalleForm.get("summary")?.setValue(data.summary);
          this.detalleForm.get("duracion")?.setValue(data.duracion);
          this.detalleForm.get("modalidad")?.setValue(data.modalidad);
          this.detalleForm.get("universidad")?.setValue(data.universidad);
          this.detalleForm.get("facultad")?.setValue(data.facultad);
        },
        error: (err:ServerError)=> {
          if (err.status==404) {
            this.noExiste=true;
          }
          console.log(err);
        }
      });
    } else {
      this.idCarreras = 0;
      this.detalleForm.get("id")?.setValue(this.idCarreras);
    }
  }

  cargarUniversidades(): void {
    this.universidadesService.listaUniversidades().subscribe({
      next: (data: Universidades[]) => {
        this.universidades = data;
      },
      error: (error) => {
        console.log('Error cargando universidades', error);
      }
    });
  }
}