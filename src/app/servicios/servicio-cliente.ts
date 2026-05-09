import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCliente {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  // 1.1 Consultar cliente por ID Nacional
  public consultarClientePorIdNacional(idNacional: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nacional/${idNacional}`);
  }

  // 1.2 Consultar cliente por ID Único
  public consultarClientePorId(idCliente: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idCliente}`);
  }
}
