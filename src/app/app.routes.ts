import { Routes } from '@angular/router';
import { MainComponent } from './main-component/main-component';
import { ConsultarLiquidacionesPersonales } from './consultar-liquidaciones-personales/consultar-liquidaciones-personales';
import { ConsultarLiquidacionesTransportistas } from './consultar-liquidaciones-transportistas/consultar-liquidaciones-transportistas';
import { ConsultarLiquidacionesContador } from './consultar-liquidaciones-contador/consultar-liquidaciones-contador';
import { ConsultarIdNacional } from './consultar-id-nacional/consultar-id-nacional';
import { RegistrarFormaDePagoCliente } from './registrar-forma-de-pago-cliente/registrar-forma-de-pago-cliente';
export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'consultar-liquidaciones-personales', component: ConsultarLiquidacionesPersonales },
            { path: 'consultar-liquidaciones-transportista', component: ConsultarLiquidacionesTransportistas },
            { path: 'consultar-liquidaciones-contador', component: ConsultarLiquidacionesContador },
            { path: 'consultar-id-nacional', component: ConsultarIdNacional },
            { path: 'registrar-forma-de-pago', component: RegistrarFormaDePagoCliente }
        ]
    }
];
