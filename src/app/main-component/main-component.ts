import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-component',
  imports: [RouterModule],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {
  
  menuActivo: string | null = null;

  constructor(private router: Router) {}

  toggleMenu(menu: string) {
    if (this.menuActivo === menu) {
      this.menuActivo = null; // collapse
    } else {
      this.menuActivo = menu; // expand
    }
  }

  navegarAPagina(ruta: string) {
    this.router.navigate([ruta]);
  }
}
