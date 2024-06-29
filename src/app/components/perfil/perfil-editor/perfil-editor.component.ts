import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstudianteDTO } from '../../../models/estudiantedto';
import { EstudiantesService } from '../../../services/estudiantes.service';
import { DatePipe } from '@angular/common';
import { ConfirmacionService } from '../../../services/confirmacion.service';
import { Router } from '@angular/router';
import { ConfirmaComponent } from '../../confirma/confirma.component';

@Component({
  selector: 'app-perfil-editor',
  templateUrl: './perfil-editor.component.html',
  styleUrls: ['./perfil-editor.component.css'],
  providers: [DatePipe]
})
export class PerfilEditorComponent implements OnInit {

  estudiante: EstudianteDTO = {
    id: 0, 
    nombre: '',
    apellido: '',
    dni: '',
    nacimiento: '',
    sexo: '',
    correo: '',
    estudianteSecundaria: false
  };

  constructor(
    private estudiantesService: EstudiantesService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private confirmacionService: ConfirmacionService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    const userId = 1; 
    this.estudiantesService.getEstudianteById(userId).subscribe(data => {
      this.estudiante = data;
    });
  }

  formatearFecha(event: any) {
    if (event.value) {
      const fechaFormateada = this.datePipe.transform(event.value, 'yyyy-MM-dd');
      if (fechaFormateada) {
        this.estudiante.nacimiento = fechaFormateada;
      }
    }
  }

  confirmarGuardarCambios() {
    this.confirmacionService.confirmarAccion('¿Está seguro de actualizar?', 'perfil del estudiante').subscribe(confirma => {
      if (confirma === true) {
        this.guardarCambios();
        this.router.navigateByUrl('/perfil').then(() => {
          window.location.reload();
        });
      }
    });
  }

  guardarCambios() {
    this.estudiantesService.actualizarEstudiante(this.estudiante).subscribe(
      () => {
        this.snackBar.open('Estudiante actualizado correctamente', 'OK', { duration: 2000 });
      },
      error => {
        console.error('Error al actualizar estudiante:', error);
        this.snackBar.open('Error al actualizar el estudiante', 'OK', { duration: 2000 });
     }
    );
  }
}
