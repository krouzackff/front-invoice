import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioFormaPagoCliente {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 2.3 Consultar forma de pago actual por ID de cliente
  public consultarFormaPagoActual(idCliente: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clientes/${idCliente}/forma-pago`);
  }

  // 2.4 Verificar si cliente tiene forma de pago
  public verificarSiTieneFormaPago(idCliente: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clientes/${idCliente}/tiene-forma-pago`);
  }

  // 2.5 Registrar forma de pago de un cliente
  public registrarFormaPago(idCliente: number, formaPagoCommand: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clientes/${idCliente}/forma-pago`, formaPagoCommand);
  }

  // 2.6 Actualizar forma de pago de un cliente
  public actualizarFormaPago(idCliente: number, formaPagoCommand: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/clientes/${idCliente}/actualizar-forma-pago`, formaPagoCommand);
  }
}
