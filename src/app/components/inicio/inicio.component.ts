import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  title = 'app';
  currentContent = 'Perfil';

  changeContent(content: string) {
    this.currentContent = content;
  }

}
