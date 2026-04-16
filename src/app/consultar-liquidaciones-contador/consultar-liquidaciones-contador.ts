import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-liquidaciones-contador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-liquidaciones-contador.html',
  styleUrl: './consultar-liquidaciones-contador.css',
})
export class ConsultarLiquidacionesContador { 
  fechaDeInicio: string = '';
  fechaDeFin: string = '';
  liquidaciones: any[] = [];

}
