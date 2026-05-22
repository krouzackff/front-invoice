import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAuth } from '../servicios/servicio-auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  usuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';
  cargando: boolean = false;

  constructor(
    private servicioAuth: ServicioAuth,
    private router: Router
  ) {}

  iniciarSesion(): void {
    // Validar campos vacíos
    if (!this.usuario.trim()) {
      this.errorMessage = 'Por favor ingrese su usuario';
      return;
    }

    if (!this.contrasena.trim()) {
      this.errorMessage = 'Por favor ingrese su contraseña';
      return;
    }

    this.cargando = true;
    this.errorMessage = '';

    // Simular un pequeño delay como si fuera una petición real
    setTimeout(() => {
      const resultado = this.servicioAuth.login(this.usuario, this.contrasena);

      if (resultado) {
        this.router.navigate(['/main']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }

      this.cargando = false;
    }, 500);
  }
}
