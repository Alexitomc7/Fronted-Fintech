import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  tipoUsuario:string="ROLE_STUDENT";
  registroForm!:FormGroup;
 

  constructor (private ruta:ActivatedRoute, private usuarioService:UsuarioService,
    private formBuilder:FormBuilder, private enrutador:Router, 
    private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.crearRegistroForm();
  }

  crearRegistroForm(){
    this.registroForm = this.formBuilder.group({
      userName:["",[Validators.minLength(5),Validators.required]],
      password:["",[Validators.minLength(5),Validators.required]]
    })
  }

  registrarUsuario(){
    const usuario:Usuario={
      id:0,
      userName:this.registroForm.get("userName")!.value,
      password:this.registroForm.get("password")!.value,
      type: this.tipoUsuario
    };

    this.usuarioService.registraUsuario(usuario).subscribe({
      next:(data)=>{
        this.enrutador.navigate(["/"])
        this._snackBar.open("El usuario se registro con exito!","OK",{duration:2000});
      },
      error:(err)=>{
        console.log(err);
        this._snackBar.open("No se registro usuario: "+err.error.message,"OK",{duration:3000});

      }
    })
  }
}
