import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-component',
  imports: [RouterModule],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {

  constructor(private router: Router) {

  }

  navegarAPagina(ruta: string) {
    this.router.navigate([ruta]);
  }
}
