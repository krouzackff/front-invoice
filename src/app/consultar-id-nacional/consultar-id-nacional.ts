// consultar-id-nacional.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioCliente } from '../servicios/servicio-cliente';
import { catchError, switchMap, of } from 'rxjs';

export interface ClienteResponse {
    idCliente: string;
    idNacional: string;
    nombre: string;
    telefono: string;
    direccion: string;
}

@Component({
  selector: 'app-consultar-id-nacional',
  imports: [FormsModule, CommonModule],
  templateUrl: './consultar-id-nacional.html',
  styleUrl: './consultar-id-nacional.css',
})
export class ConsultarIdNacional {
  // Variable única para el usuario (puede ingresar cédula o ID)
  identificador: string = '';
  cliente: ClienteResponse | null = null;
  errorMessage: string = '';
  cargando: boolean = false;
  buscandoEnSegundoEndpoint: boolean = false; // Para mostrar mensaje opcional

  constructor(private servicioCliente: ServicioCliente) {}

  buscarCliente(): void {
    // Validar que haya ingresado algo
    if (!this.identificador.trim()) {
      this.errorMessage = 'Por favor ingrese un ID Nacional o ID de Cliente';
      this.cliente = null;
      return;
    }

    // Resetear estados
    this.cargando = true;
    this.errorMessage = '';
    this.cliente = null;
    this.buscandoEnSegundoEndpoint = false;

    // Limpiar el identificador (sin espacios)
    const input = this.identificador.trim();

    // PRIMERO: Intentar buscar como ID de base de datos
    console.log(`Intentando buscar por ID: ${input}`);
    
    this.servicioCliente.consultarClientePorId(input)
      .pipe(
        // Si falla, intentar por ID nacional
        catchError((error) => {
          console.log(`Falló búsqueda por ID (${error.status}), intentando por ID Nacional...`);
          this.buscandoEnSegundoEndpoint = true;
          
          if (error.status === 404) {
            // El ID no existe, intentar por ID nacional
            return this.servicioCliente.consultarClientePorIdNacional(input);
          }
          // Otro error (500, 400, etc.)
          throw error;
        })
      )
      .subscribe({
        next: (data: ClienteResponse) => {
          this.cliente = data;
          this.cargando = false;
          this.buscandoEnSegundoEndpoint = false;
          
          // Mensaje de éxito con información de qué tipo encontró
          if (this.identificador === data.idCliente) {
            console.log('Cliente encontrado por ID de base de datos');
          } else {
            console.log('Cliente encontrado por ID Nacional (cédula)');
          }
        },
        error: (error) => {
          this.cargando = false;
          this.buscandoEnSegundoEndpoint = false;
          
          // Si ambos endpoints fallaron con 404
          if (error.status === 404) {
            this.errorMessage = 'Cliente no encontrado. Verifique el ID Nacional o ID de Cliente ingresado.';
          } else {
            this.errorMessage = 'Error al buscar cliente. Intente nuevamente.';
          }
          console.error('Error en ambas búsquedas:', error);
        }
      });
  }

  agregarMetodoPago(): void {
    console.log('Agregar método de pago para cliente:', this.cliente?.idCliente);
    alert(`Agregar método de pago para cliente: ${this.cliente?.nombre}`);
  }
}