import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' && target.hasAttribute('href')) {
      event.preventDefault();
      const sectionId = target.getAttribute('href')!.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
