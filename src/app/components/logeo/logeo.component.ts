import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../models/usuario';
import { Token } from '../../models/token';

@Component({
  selector: 'app-logeo',
  templateUrl: './logeo.component.html',
  styleUrl: './logeo.component.css'
})
export class LogeoComponent {
  logeoForm!:FormGroup;
  muestraPassword: boolean=false;

  constructor (private ruta:ActivatedRoute, private usuarioService:UsuarioService,
    private formBuilder:FormBuilder, private enrutador:Router, 
    private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.crearLogeoForm();
  }

  crearLogeoForm(){
    this.logeoForm = this.formBuilder.group({
      userName:["",[Validators.minLength(5),Validators.required]],
      password:["",[Validators.minLength(5),Validators.required]]
    })
  }

  logearUsuario(){
    const usuario:Usuario={
      id:0,
      userName:this.logeoForm.get("userName")!.value,
      password:this.logeoForm.get("password")!.value,
      type: ""
    };

    this.usuarioService.logearUsuario(usuario).subscribe({
      next:(data:Token)=>{
        
        
        this.enrutador.navigate(["/inicio"]);


      },
      error:(err)=>{
        console.log(err);
        this._snackBar.open("Error en el ingreso: "+err.error.message,"OK",{duration:3000});
      }
    })
  }
}
