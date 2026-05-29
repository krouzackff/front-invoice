// src/app/servicios/servicio-liquidacion-transportista.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LiquidacionTransportistaResponse } from '../modelos/response/consultar-liquidacion-transportista';
import { CrearLiquidacionTransportistaRequest } from '../modelos/request/crear-liquidacion-transportista-request';
import { ActualizarMontoLiquidacionRequest } from '../modelos/request/actualizar-monto-liquidacion-request';

@Injectable({
  providedIn: 'root'
})
export class ServicioLiquidacionTransportista {
  private apiUrl = `${environment.apiUrl}/transportistas`;

  constructor(private http: HttpClient) {}

  // 3.4 Consultar liquidaciones de un transportista
  consultarLiquidaciones(
    idTransportista: number,
    pagina: number = 0,
    tamanoPagina: number = 20
  ): Observable<LiquidacionTransportistaResponse[]> {
    const url = `${this.apiUrl}/${idTransportista}/liquidaciones`;
    const params = {
      pagina: pagina.toString(),
      tamanoPagina: tamanoPagina.toString()
    };
    return this.http.get<LiquidacionTransportistaResponse[]>(url, { params });
  }

  // 3.5 Crear liquidación de transportista
  crearLiquidacion(request: CrearLiquidacionTransportistaRequest): Observable<LiquidacionTransportistaResponse> {
    return this.http.post<LiquidacionTransportistaResponse>(`${this.apiUrl}/liquidaciones`, request);
  }

  // 3.6 Actualizar monto de liquidación de transportista
  actualizarMontoLiquidacion(idLiquidacion: number, request: ActualizarMontoLiquidacionRequest): Observable<LiquidacionTransportistaResponse> {
    return this.http.put<LiquidacionTransportistaResponse>(`${this.apiUrl}/liquidaciones/${idLiquidacion}/monto`, request);
  }
}