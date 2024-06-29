import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  tipoUsuario: string = "ROLE_STUDENT";
  registroForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private enrutador: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crearRegistroForm();
  }

  crearRegistroForm(): void {
    this.registroForm = this.formBuilder.group({
      userName: ["", [Validators.minLength(5), Validators.required]],
      password: ["", [Validators.minLength(5), Validators.required]],
      nombre: ["", Validators.required], // EstudianteDTO fields
      apellido: ["", Validators.required],
      dni: ["", Validators.required],
      nacimiento: ["", Validators.required],
      sexo: ["", Validators.required],
      correo: ["", Validators.required],
      estudianteSecundaria: [false, Validators.required]
    });
  }

  registrarUsuario(): void {
    const usuario: Usuario = {
      id: 0,
      userName: this.registroForm.get("userName")!.value,
      password: this.registroForm.get("password")!.value,
      type: this.tipoUsuario,
      estudianteDTO: {
        id: 0,
        nombre: this.registroForm.get("nombre")!.value,
        apellido: this.registroForm.get("apellido")!.value,
        dni: this.registroForm.get("dni")!.value,
        nacimiento: this.registroForm.get("nacimiento")!.value,
        sexo: this.registroForm.get("sexo")!.value,
        correo: this.registroForm.get("correo")!.value,
        estudianteSecundaria: this.registroForm.get("estudianteSecundaria")!.value
      }
    };

    this.usuarioService.registraUsuario(usuario).subscribe({
      next: (data) => {
        this.usuarioService.logearUsuario(usuario).subscribe(() => {
          this.enrutador.navigate(["/perfil"]);
          this._snackBar.open("El usuario se registró con éxito!", "OK", { duration: 2000 });
        });
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open("No se registró el usuario: " + err.error.message, "OK", { duration: 3000 });
      }
    });
  }
}

