// consultar-liquidaciones-transportistas.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioLiquidacionTransportista } from '../servicios/servicio-liquidacion-transportista';
import { LiquidacionTransportistaResponse } from '../modelos/consultar-liquidacion-transportista';

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
  idTransportista: number = 1; // ID fijo para probar, luego se puede obtener del login

  constructor(private servicio: ServicioLiquidacionTransportista) {}

  ngOnInit(): void {
    this.cargarLiquidaciones();
  }

  public cargarLiquidaciones(): void {
    this.servicio.consultarLiquidaciones(this.idTransportista, 0, 20)
      .subscribe({
        next: (data) => {
          this.liquidaciones = data;
          console.log('Liquidaciones de transportista cargadas:', this.liquidaciones);
          
          // Si tienes filtros por fecha, filtrar localmente
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
    
    this.liquidaciones = resultado;
  }
}