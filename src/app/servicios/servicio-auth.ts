import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicioAuth {

  private readonly STORAGE_KEY = 'usuario_autenticado';

  constructor(private router: Router) {}

  login(usuario: string, contrasena: string): boolean {
    // Validación simulada: acepta cualquier usuario y contraseña no vacíos
    if (usuario.trim() && contrasena.trim()) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ usuario: usuario }));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  getUsuario(): string {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      return JSON.parse(data).usuario;
    }
    return '';
  }
}
