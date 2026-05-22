import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServicioAuth } from '../servicios/servicio-auth';

@Component({
  selector: 'app-main-component',
  imports: [RouterModule],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicioAuth: ServicioAuth
  ) {}

  navegarAPagina(ruta: string) {
    this.router.navigate([ruta], { relativeTo: this.route });
  }

  cerrarSesion(): void {
    this.servicioAuth.logout();
  }
}
