import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-liquidaciones-transportistas',
  imports: [FormsModule, CommonModule],
  templateUrl: './consultar-liquidaciones-transportistas.html',
  styleUrl: './consultar-liquidaciones-transportistas.css',
})
export class ConsultarLiquidacionesTransportistas {
  fechaDeInicio: string = '';
  fechaDeFin: string = '';
  liquidaciones: any[] = [];
}
