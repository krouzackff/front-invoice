import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LiquidacionClienteResponse } from '../modelos/response/consultar-liquidacion-personal';
import { CrearLiquidacionClienteRequest } from '../modelos/request/crear-liquidacion-cliente-request';
import { ActualizarEstadoLiquidacionRequest } from '../modelos/request/actualizar-estado-liquidacion-request';

@Injectable({
  providedIn: 'root',
})
export class ServicioLiquidacionPersonal {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  // 3.1 Consultar liquidaciones de un cliente
  consultarLiquidaciones(idCliente: number, pagina: number = 0, tamanoPagina: number = 20): Observable<LiquidacionClienteResponse[]> {
    const url = `${this.apiUrl}/${idCliente}/liquidaciones`;
    const params = { pagina, tamanoPagina };
    return this.http.get<LiquidacionClienteResponse[]>(url, { params });
  }

  // 3.2 Crear liquidación de cliente
  crearLiquidacion(request: CrearLiquidacionClienteRequest): Observable<LiquidacionClienteResponse> {
    return this.http.post<LiquidacionClienteResponse>(`${this.apiUrl}/liquidaciones`, request);
  }

  // 3.3 Actualizar estado de liquidación de cliente
  actualizarEstadoLiquidacion(idLiquidacion: number, request: ActualizarEstadoLiquidacionRequest): Observable<LiquidacionClienteResponse> {
    return this.http.put<LiquidacionClienteResponse>(`${this.apiUrl}/liquidaciones/${idLiquidacion}/estado`, request);
  }
}

