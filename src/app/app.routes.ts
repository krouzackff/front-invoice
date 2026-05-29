import { Routes } from '@angular/router';
import { MainComponent } from './main-component/main-component';
import { ConsultarLiquidacionesPersonales } from './consultar-liquidaciones-personales/consultar-liquidaciones-personales';
import { ConsultarLiquidacionesTransportistas } from './consultar-liquidaciones-transportistas/consultar-liquidaciones-transportistas';
import { ConsultarLiquidacionesContador } from './consultar-liquidaciones-contador/consultar-liquidaciones-contador';
import { ConsultarIdNacional } from './consultar-id-nacional/consultar-id-nacional';
import { RegistrarFormaDePagoCliente } from './registrar-forma-de-pago-cliente/registrar-forma-de-pago-cliente';
import { GestionPedido } from './gestion-pedido/gestion-pedido';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'gestion-pedido', pathMatch: 'full' },
            { path: 'consultar-liquidaciones-personales', component: ConsultarLiquidacionesPersonales },
            { path: 'consultar-liquidaciones-transportista', component: ConsultarLiquidacionesTransportistas },
            { path: 'consultar-liquidaciones-contador', component: ConsultarLiquidacionesContador },
            { path: 'consultar-id-nacional', component: ConsultarIdNacional },
            { path: 'registrar-forma-de-pago', component: RegistrarFormaDePagoCliente },
            { path: 'gestion-pedido', component: GestionPedido }
        ]
    }
];
