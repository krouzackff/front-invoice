import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiquidacionContadorResponse } from '../modelos/response/liquidacion-contador-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicioLiquidacionContable {

  private apiUrl = `${environment.apiUrl}/liquidaciones`;

  constructor(private http: HttpClient) {}

  consultarLiquidaciones(
    tipo?: string,
    idSujeto?: number,
    fechaDesde?: string,
    fechaHasta?: string,
    pagina: number = 0,
    tamanoPagina: number = 20
  ): Observable<LiquidacionContadorResponse[]> {

    let params: any = {
      pagina,
      tamanoPagina
    };

    if (tipo) params.tipo = tipo;
    if (idSujeto) params.idSujeto = idSujeto;
    if (fechaDesde) params.fechaDesde = fechaDesde;
    if (fechaHasta) params.fechaHasta = fechaHasta;

    return this.http.get<LiquidacionContadorResponse[]>(this.apiUrl, { params });
  }
}