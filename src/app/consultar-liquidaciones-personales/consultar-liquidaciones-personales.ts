import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioLiquidacionPersonal } from '../servicios/servicio-liquidacion-personal';
import { LiquidacionClienteResponse } from '../modelos/consultar-liquidacion-personal';

@Component({
  selector: 'app-consultar-liquidaciones-personales',
  imports: [FormsModule, CommonModule],
  templateUrl: './consultar-liquidaciones-personales.html',
  styleUrl: './consultar-liquidaciones-personales.css',
})
export class ConsultarLiquidacionesPersonales implements OnInit {
  
  fechaFin: string='';
  fechaInicio: string='';
  liquidaciones: LiquidacionClienteResponse[] = [];
  idCliente: number = 1;  // ID fijo para probar

  constructor(private servicio: ServicioLiquidacionPersonal) {
    this.cargarLiquidaciones();
  }

  ngOnInit(): void {
    this.cargarLiquidaciones();
  }

  public cargarLiquidaciones(): void {
    this.servicio.consultarLiquidaciones(this.idCliente, 0, 20)
      .subscribe({
        next: (data) => {
          this.liquidaciones = data;
          console.log('Liquidaciones cargadas:', this.liquidaciones);
        },
        error: (error) => {
          console.error('Error al cargar liquidaciones:', error);
        }
      });
  }
}