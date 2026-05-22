import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServicioAuth } from '../servicios/servicio-auth';

export const authGuard: CanActivateFn = (route, state) => {
  const servicioAuth = inject(ServicioAuth);
  const router = inject(Router);

  if (servicioAuth.isLoggedIn()) {
    return true;
  }

  // Si no está autenticado, redirigir al login
  router.navigate(['/login']);
  return false;
};
