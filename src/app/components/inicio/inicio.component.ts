import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  title = 'app';
  currentContent = 'Perfil';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  logout() {
    this.usuarioService.deslogearUsuario();
    this.router.navigate(["/"]); 
  }

  hayUsuarioLogeado() {
    return this.usuarioService.getId() !== null;
  }
}