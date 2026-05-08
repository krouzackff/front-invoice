// src/app/servicios/servicio-liquidacion-transportista.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiquidacionTransportistaResponse } from '../modelos/consultar-liquidacion-transportista';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioLiquidacionTransportista {
  
  // Ajusta la URL base según tu configuración
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  consultarLiquidaciones(
    idTransportista: number, 
    pagina: number = 0, 
    tamanoPagina: number = 20
  ): Observable<LiquidacionTransportistaResponse[]> {
    const url = `${this.apiUrl}/transportistas/${idTransportista}/liquidaciones`;
    const params = {
      pagina: pagina.toString(),
      tamanoPagina: tamanoPagina.toString()
    };
    return this.http.get<LiquidacionTransportistaResponse[]>(url, { params });
  }
}