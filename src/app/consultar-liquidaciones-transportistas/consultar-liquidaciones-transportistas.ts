// consultar-liquidaciones-transportistas.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioLiquidacionTransportista } from '../servicios/servicio-liquidacion-transportista';
import { LiquidacionTransportistaResponse } from '../modelos/response/consultar-liquidacion-transportista';
import { ActualizarMontoLiquidacionRequest } from '../modelos/request/actualizar-monto-liquidacion-request';

@Component({
  selector: 'app-consultar-liquidaciones-transportistas',
  imports: [FormsModule, CommonModule],
  templateUrl: './consultar-liquidaciones-transportistas.html',
  styleUrl: './consultar-liquidaciones-transportistas.css',
})
export class ConsultarLiquidacionesTransportistas {
  fechaDeInicio: string = '';
  fechaDeFin: string = '';
  liquidaciones: LiquidacionTransportistaResponse[] = [];
  liquidacionesFiltradas: LiquidacionTransportistaResponse[] = [];
  idTransportista: number = 1;

  // Estado para actualizar monto (endpoint 3.6)
  liquidacionEditando: LiquidacionTransportistaResponse | null = null;
  nuevoMonto: number = 0;
  actualizando: boolean = false;
  errorActualizacion: string = '';

  constructor(private servicio: ServicioLiquidacionTransportista) {}

  ngOnInit(): void {
    this.cargarLiquidaciones();
  }

  public cargarLiquidaciones(): void {
    this.servicio.consultarLiquidaciones(this.idTransportista, 0, 20)
      .subscribe({
        next: (data) => {
          this.liquidaciones = data;
          this.aplicarFiltrosPorFecha();
        },
        error: (error) => {
          console.error('Error al cargar liquidaciones del transportista:', error);
        }
      });
  }

  private aplicarFiltrosPorFecha(): void {
    let resultado = [...this.liquidaciones];
    if (this.fechaDeInicio) {
      const fechaInicio = new Date(this.fechaDeInicio);
      resultado = resultado.filter(l => new Date(l.fechaLiquidacion) >= fechaInicio);
    }
    if (this.fechaDeFin) {
      const fechaFin = new Date(this.fechaDeFin);
      fechaFin.setHours(23, 59, 59);
      resultado = resultado.filter(l => new Date(l.fechaLiquidacion) <= fechaFin);
    }
    this.liquidacionesFiltradas = resultado;
  }

  public filtrar(): void {
    this.aplicarFiltrosPorFecha();
  }

  // Consume endpoint 3.6: PUT /transportistas/liquidaciones/{id}/monto
  public abrirEditorMonto(liq: LiquidacionTransportistaResponse): void {
    this.liquidacionEditando = liq;
    this.nuevoMonto = liq.montoCalculado;
    this.errorActualizacion = '';
  }

  public cerrarEditorMonto(): void {
    this.liquidacionEditando = null;
    this.nuevoMonto = 0;
    this.errorActualizacion = '';
  }

  public actualizarMonto(): void {
    if (!this.liquidacionEditando || !this.nuevoMonto) return;
    this.actualizando = true;
    this.errorActualizacion = '';

    const request: ActualizarMontoLiquidacionRequest = { montoCalculado: this.nuevoMonto };

    this.servicio.actualizarMontoLiquidacion(this.liquidacionEditando.idLiquidacion, request)
      .subscribe({
        next: (data) => {
          const idx = this.liquidaciones.findIndex(l => l.idLiquidacion === data.idLiquidacion);
          if (idx !== -1) this.liquidaciones[idx] = data;
          this.aplicarFiltrosPorFecha();
          this.actualizando = false;
          this.cerrarEditorMonto();
        },
        error: (err) => {
          this.errorActualizacion = 'Error al actualizar el monto';
          this.actualizando = false;
          console.error(err);
        }
      });
  }
}