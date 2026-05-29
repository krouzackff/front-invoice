// gestion-pedido.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioPedido } from '../servicios/servicio-pedido';
import { ServicioFormaPagoCliente } from '../servicios/servicio-forma-pago-cliente';
import { ServicioLiquidacionPersonal } from '../servicios/servicio-liquidacion-personal';
import { ServicioLiquidacionTransportista } from '../servicios/servicio-liquidacion-transportista';
import { CrearLiquidacionClienteRequest } from '../modelos/request/crear-liquidacion-cliente-request';
import { CrearLiquidacionTransportistaRequest } from '../modelos/request/crear-liquidacion-transportista-request';

@Component({
  selector: 'app-gestion-pedido',
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-pedido.html',
  styleUrl: './gestion-pedido.css',
})
export class GestionPedido {

  // ─── Búsqueda ───────────────────────────────────────────────
  idPedido: number | null = null;
  buscando: boolean = false;
  errorBusqueda: string = '';

  // ─── Datos del pedido (endpoints 1.1 y 1.2) ─────────────────
  totalPedido: any = null;
  pagoTransporte: any = null;

  // ─── Forma de pago del cliente por pedido (endpoint 2.1/2.2) ─
  formaPagoCliente: any = null;
  tieneFormaPagoCliente: boolean | null = null;

  // ─── Crear liquidación cliente (endpoint 3.2) ────────────────
  seccionLiqCliente: boolean = false;
  liqCliente: CrearLiquidacionClienteRequest = {
    idPedido: 0,
    idCliente: 0,
    formaPago: '',
    montoLiquidado: 0,
  };
  guardandoLiqCliente: boolean = false;
  resultadoLiqCliente: any = null;
  errorLiqCliente: string = '';

  // ─── Crear liquidación transportista (endpoint 3.5) ──────────
  seccionLiqTransportista: boolean = false;
  liqTransportista: CrearLiquidacionTransportistaRequest = {
    idPedido: 0,
    idTransportista: 0,
    montoCalculado: 0,
  };
  guardandoLiqTransportista: boolean = false;
  resultadoLiqTransportista: any = null;
  errorLiqTransportista: string = '';

  constructor(
    private servicioPedido: ServicioPedido,
    private servicioFormaPago: ServicioFormaPagoCliente,
    private servicioLiqPersonal: ServicioLiquidacionPersonal,
    private servicioLiqTransportista: ServicioLiquidacionTransportista,
    private cdr: ChangeDetectorRef
  ) {}

  // ────────────────────────────────────────────────────────────
  //  BUSCAR PEDIDO: carga todos los datos del pedido en paralelo
  // ────────────────────────────────────────────────────────────
  buscarPedido(): void {
    if (!this.idPedido) {
      this.errorBusqueda = 'Ingrese un ID de pedido válido';
      return;
    }

    this.buscando = true;
    this.errorBusqueda = '';
    this.totalPedido = null;
    this.pagoTransporte = null;
    this.formaPagoCliente = null;
    this.tieneFormaPagoCliente = null;
    this.resultadoLiqCliente = null;
    this.resultadoLiqTransportista = null;
    this.seccionLiqCliente = false;
    this.seccionLiqTransportista = false;
    this._llamadasCompletadas = 0; // Resetear contador de llamadas al iniciar

    const id = this.idPedido;

    // 1.1 Total del pedido
    this.servicioPedido.consultarTotalPedido(id).subscribe({
      next: (data) => { 
        this.totalPedido = data; 
        console.log('Total pedido cargado:', data);
        this.verificarCarga(); 
      },
      error: (err) => { 
        console.warn('Total pedido no disponible (404/Error)', err); 
        this.totalPedido = null; 
        this.verificarCarga(); 
      }
    });

    // 1.2 Pago de transporte
    this.servicioPedido.consultarPagoTransporte(id).subscribe({
      next: (data) => { 
        this.pagoTransporte = data; 
        console.log('Pago transporte cargado:', data);
        this.verificarCarga(); 
      },
      error: (err) => { 
        console.warn('Pago transporte no disponible (404/Error)', err); 
        this.pagoTransporte = null; 
        this.verificarCarga(); 
      }
    });

    // 2.2 Verificar si el cliente asociado al pedido tiene forma de pago
    this.servicioFormaPago.verificarSiTieneFormaPagoPorPedido(id).subscribe({
      next: (data) => {
        this.tieneFormaPagoCliente = data.tieneFormaPago;
        console.log('Verificar forma pago:', data);
        if (data.tieneFormaPago) {
          // 2.1 Si tiene, cargar la forma de pago
          this.servicioFormaPago.consultarFormaPagoPorPedido(id).subscribe({
            next: (fp) => { 
              this.formaPagoCliente = fp; 
              console.log('Forma pago cliente cargada:', fp);
              this.verificarCarga(); 
            },
            error: (err) => { 
              console.error('Error al consultar forma pago cliente:', err);
              this.verificarCarga(); 
            }
          });
        } else {
          this.verificarCarga();
        }
      },
      error: (err) => { 
        console.warn('Verificación de forma de pago falló o no existe (404/Error)', err);
        this.tieneFormaPagoCliente = false; 
        this.verificarCarga(); 
      }
    });
  }

  private _llamadasCompletadas = 0;
  private verificarCarga(): void {
    this._llamadasCompletadas++;
    console.log(`Llamada completada ${this._llamadasCompletadas}/3`);
    if (this._llamadasCompletadas >= 3) {
      this.buscando = false;
      this._llamadasCompletadas = 0;
      
      // Si todo es null, asumimos que el pedido no existe
      if (this.totalPedido === null && this.pagoTransporte === null) {
        this.errorBusqueda = `El pedido #${this.idPedido} no existe o no tiene información registrada en el servidor.`;
      } else {
        // Prellenar idPedido en los formularios
        if (this.idPedido) {
          this.liqCliente.idPedido = this.idPedido;
          this.liqTransportista.idPedido = this.idPedido;
        }
      }
      // Forzar la actualización de la vista de Angular
      this.cdr.detectChanges();
      console.log('UI Actualizada, buscando:', this.buscando);
    }
  }

  // ────────────────────────────────────────────────────────────
  //  3.2 Crear liquidación de cliente
  // ────────────────────────────────────────────────────────────
  toggleSeccionCliente(): void {
    this.seccionLiqCliente = !this.seccionLiqCliente;
  }

  crearLiquidacionCliente(): void {
    if (!this.liqCliente.idCliente || !this.liqCliente.formaPago || !this.liqCliente.montoLiquidado) {
      this.errorLiqCliente = 'Complete todos los campos requeridos';
      return;
    }
    this.guardandoLiqCliente = true;
    this.errorLiqCliente = '';
    this.resultadoLiqCliente = null;

    this.servicioLiqPersonal.crearLiquidacion(this.liqCliente).subscribe({
      next: (data) => {
        this.resultadoLiqCliente = data;
        this.guardandoLiqCliente = false;
        this.seccionLiqCliente = false;
      },
      error: (err) => {
        this.errorLiqCliente = 'Error al crear liquidación de cliente';
        this.guardandoLiqCliente = false;
        console.error(err);
      }
    });
  }

  // ────────────────────────────────────────────────────────────
  //  3.5 Crear liquidación de transportista
  // ────────────────────────────────────────────────────────────
  toggleSeccionTransportista(): void {
    this.seccionLiqTransportista = !this.seccionLiqTransportista;
  }

  crearLiquidacionTransportista(): void {
    if (!this.liqTransportista.idTransportista || !this.liqTransportista.montoCalculado) {
      this.errorLiqTransportista = 'Complete todos los campos requeridos';
      return;
    }
    this.guardandoLiqTransportista = true;
    this.errorLiqTransportista = '';
    this.resultadoLiqTransportista = null;

    this.servicioLiqTransportista.crearLiquidacion(this.liqTransportista).subscribe({
      next: (data) => {
        this.resultadoLiqTransportista = data;
        this.guardandoLiqTransportista = false;
        this.seccionLiqTransportista = false;
      },
      error: (err) => {
        this.errorLiqTransportista = 'Error al crear liquidación de transportista';
        this.guardandoLiqTransportista = false;
        console.error(err);
      }
    });
  }

  // ─── Helpers ─────────────────────────────────────────────────
  get pedidoCargado(): boolean {
    return !this.buscando && (this.totalPedido !== null || this.pagoTransporte !== null);
  }
}
