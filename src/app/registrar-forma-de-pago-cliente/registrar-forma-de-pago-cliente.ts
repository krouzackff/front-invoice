// registrar-forma-de-pago-cliente.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioCliente } from '../servicios/servicio-cliente';
import { ServicioFormaPagoCliente } from '../servicios/servicio-forma-pago-cliente';
import { FormaPagoClienteResponse } from '../modelos/response/forma-pago-cliente-response';
import { FormaPagoCommand } from '../modelos/request/forma-pago-command'; 

@Component({
  selector: 'app-registrar-forma-de-pago-cliente',
  imports: [FormsModule, CommonModule, ],
  templateUrl: './registrar-forma-de-pago-cliente.html',
  styleUrl: './registrar-forma-de-pago-cliente.css'
})
export class RegistrarFormaDePagoCliente {
  
  // Variables del formulario
  identificador: string = '';
  cliente: any = null;
  errorMessage: string = '';
  cargando: boolean = false;
  
  // Variables para forma de pago
  formaPagoSeleccionada: string = '';
  formaPagoActual: FormaPagoClienteResponse | null = null;
  tieneFormaPago: boolean = false;
  guardando: boolean = false;
  mostrarFormularioPago: boolean = true;

  constructor(
    private servicioCliente: ServicioCliente,
    private servicioFormaPago: ServicioFormaPagoCliente
  ) {}

  // Buscar cliente por ID Nacional o ID
  buscarCliente(): void {
    if (!this.identificador.trim()) {
      this.errorMessage = 'Ingrese un ID Nacional o ID de Cliente';
      return;
    }

    this.cargando = true;
    this.errorMessage = '';
    this.cliente = null;
    this.formaPagoActual = null;
    this.tieneFormaPago = false;
    this.formaPagoSeleccionada = '';
    this.mostrarFormularioPago = true;

    const input = this.identificador.trim();

    // Intentar buscar por ID primero, luego por ID Nacional
    this.servicioCliente.consultarClientePorId(input)
      .subscribe({
        next: (data) => {
          this.cliente = data;
          this.cargando = false;
          this.verificarFormaPago();
        },
        error: () => {
          // Si falla por ID, intentar por ID Nacional
          this.servicioCliente.consultarClientePorIdNacional(input)
            .subscribe({
              next: (data) => {
                this.cliente = data;
                this.cargando = false;
                this.verificarFormaPago();
              },
              error: () => {
                this.cargando = false;
                this.errorMessage = 'Cliente no encontrado';
              }
            });
        }
      });
  }

  // Verificar si el cliente ya tiene forma de pago
  // Verificar si el cliente ya tiene forma de pago
verificarFormaPago(): void {
  if (!this.cliente) return;

  // Cambiar consultarFormaPago → consultarFormaPagoActual
  this.servicioFormaPago.consultarFormaPagoActual(this.cliente.idCliente)
    .subscribe({
      next: (data) => {
        this.formaPagoActual = data;
        this.tieneFormaPago = true;
        this.formaPagoSeleccionada = data.formaPago;
        
        // Si ya tiene forma de pago, ocultar formulario inicialmente
        if (this.tieneFormaPago) {
          this.mostrarFormularioPago = false;
        }
      },
      error: (error) => {
        if (error.status === 404) {
          this.tieneFormaPago = false;
          this.mostrarFormularioPago = true;
        }
      }
    });
}

  // Seleccionar forma de pago
  seleccionarFormaPago(formaPago: string): void {
    this.formaPagoSeleccionada = formaPago;
  }

  // Guardar o actualizar forma de pago
  guardarFormaPago(): void {
    if (!this.formaPagoSeleccionada) {
      this.errorMessage = 'Seleccione una forma de pago';
      return;
    }

    if (!this.cliente) {
      this.errorMessage = 'Primero busque un cliente';
      return;
    }

    this.guardando = true;
    this.errorMessage = '';

    const command: FormaPagoCommand = {
      formaPago: this.formaPagoSeleccionada
    };

    if (this.tieneFormaPago) {
      // Actualizar
      this.servicioFormaPago.actualizarFormaPago(this.cliente.idCliente, command)
        .subscribe({
          next: (data) => {
            this.formaPagoActual = data;
            this.guardando = false;
            this.mostrarFormularioPago = false;
            alert('Forma de pago actualizada exitosamente');
          },
          error: (error) => {
            this.guardando = false;
            this.errorMessage = 'Error al actualizar forma de pago';
            console.error(error);
          }
        });
    } else {
      // Registrar nueva
      this.servicioFormaPago.registrarFormaPago(this.cliente.idCliente, command)
        .subscribe({
          next: (data) => {
            this.formaPagoActual = data;
            this.tieneFormaPago = true;
            this.guardando = false;
            this.mostrarFormularioPago = false;
            alert('Forma de pago registrada exitosamente');
          },
          error: (error) => {
            this.guardando = false;
            this.errorMessage = 'Error al registrar forma de pago';
            console.error(error);
          }
        });
    }
  }
}