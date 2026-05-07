import { Component, OnInit } from '@angular/core';
import { ServicioLiquidacionContable } from '../servicios/servicio-liquidacion-contador';
import { LiquidacionContadorResponse } from '../modelos/liquidacion-contador-response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liquidaciones-contables',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './consultar-liquidaciones-contador.html',
  styleUrl: './consultar-liquidaciones-contador.css'
})
export class ConsultarLiquidacionesContador implements OnInit { 
  liquidaciones: LiquidacionContadorResponse[] = [];

  tipo: string = '';
  idSujeto?: number;
  fechaDesde: string = '';
  fechaHasta: string = '';

  constructor(private servicio: ServicioLiquidacionContable) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.servicio.consultarLiquidaciones(
      this.tipo || undefined,
      this.idSujeto,
      this.fechaDesde || undefined,
      this.fechaHasta || undefined,
      0,
      20
    ).subscribe({
      next: (data) => {
        this.liquidaciones = data;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

}
