import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-liquidaciones-personales',
  imports: [FormsModule, CommonModule],
  templateUrl: './consultar-liquidaciones-personales.html',
  styleUrl: './consultar-liquidaciones-personales.css',
})
export class ConsultarLiquidacionesPersonales {
  fechaDeInicio: string = '';
  fechaDeFin: string = '';
  liquidaciones: any[] = [];

}
