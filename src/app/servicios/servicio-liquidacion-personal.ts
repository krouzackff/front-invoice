import { Injectable } from '@angular/core';
import { LiquidacionClienteResponse } from '../modelos/consultar-liquidacion-personal';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicioLiquidacionPersonal {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  consultarLiquidaciones(idCliente: number, pagina: number = 0, tamañoPagina: number = 20): Observable<LiquidacionClienteResponse[]> {
    const url = `${this.apiUrl}/${idCliente}/liquidaciones`;
    const params = { pagina, tamañoPagina };
    return this.http.get<LiquidacionClienteResponse[]>(url, { params });
  }
}
