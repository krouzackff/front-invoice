import { Routes } from '@angular/router';
import { MainComponent } from './main-component/main-component';
import { ConsultarLiquidacionesPersonales } from './consultar-liquidaciones-personales/consultar-liquidaciones-personales';
import { ConsultarLiquidacionesTransportistas } from './consultar-liquidaciones-transportistas/consultar-liquidaciones-transportistas';
import { ConsultarLiquidacionesContador } from './consultar-liquidaciones-contador/consultar-liquidaciones-contador';
import { ConsultarIdNacional } from './consultar-id-nacional/consultar-id-nacional';
import { RegistrarFormaDePagoCliente } from './registrar-forma-de-pago-cliente/registrar-forma-de-pago-cliente';
import { LoginComponent } from './login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    // Ruta del Login (ruta padre independiente, sin guard)
    { path: 'login', component: LoginComponent },

    // Ruta del Main (protegida con authGuard, solo accesible si ya inició sesión)
    {
        path: 'main',
        component: MainComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'consultar-liquidaciones-personales', pathMatch: 'full' },
            { path: 'consultar-liquidaciones-personales', component: ConsultarLiquidacionesPersonales },
            { path: 'consultar-liquidaciones-transportista', component: ConsultarLiquidacionesTransportistas },
            { path: 'consultar-liquidaciones-contador', component: ConsultarLiquidacionesContador },
            { path: 'consultar-id-nacional', component: ConsultarIdNacional },
            { path: 'registrar-forma-de-pago', component: RegistrarFormaDePagoCliente }
        ]
    },

    // Al entrar a la raíz, redirige al login
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Cualquier ruta que no exista, redirige al login
    { path: '**', redirectTo: 'login' }
];
