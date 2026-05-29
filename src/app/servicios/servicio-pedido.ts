import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioPedido {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) { }

  // 1.1 Consultar total de un pedido
  public consultarTotalPedido(idPedido: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idPedido}/total`);
  }

  // 1.2 Consultar pago de transporte de un pedido
  public consultarPagoTransporte(idPedido: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idPedido}/pago-transporte`);
  }
}
