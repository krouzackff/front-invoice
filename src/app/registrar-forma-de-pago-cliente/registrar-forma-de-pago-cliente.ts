// registrar-forma-de-pago-cliente.ts
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core'; // ✅ Importar ChangeDetectorRef
import { FormsModule } from '@angular/forms';
import { ServicioCliente } from '../servicios/servicio-cliente';
import { ServicioFormaPagoCliente } from '../servicios/servicio-forma-pago-cliente';
import { FormaPagoClienteResponse } from '../modelos/response/forma-pago-cliente-response';
import { FormaPagoCommand } from '../modelos/request/forma-pago-command'; 

@Component({
  selector: 'app-registrar-forma-de-pago-cliente',
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-forma-de-pago-cliente.html',
  styleUrl: './registrar-forma-de-pago-cliente.css'
})
export class RegistrarFormaDePagoCliente {
  
  identificador: string = '';
  cliente: any = null;
  errorMessage: string = '';
  cargando: boolean = false;
  formaPagoSeleccionada: string = '';
  formaPagoActual: FormaPagoClienteResponse | null = null;
  tieneFormaPago: boolean = false;
  guardando: boolean = false;
  mostrarFormularioPago: boolean = true;

  constructor(
    private servicioCliente: ServicioCliente,
    private servicioFormaPago: ServicioFormaPagoCliente,
    private cdr: ChangeDetectorRef  // ✅ Inyectar ChangeDetectorRef
  ) {}

  buscarCliente(): void {
    if (!this.identificador.trim()) {
      this.errorMessage = 'Ingrese un ID Nacional o ID de Cliente';
      this.cdr.detectChanges(); // ✅ Forzar actualización
      return;
    }

    this.cargando = true;
    this.errorMessage = '';
    this.cliente = null;
    this.formaPagoActual = null;
    this.tieneFormaPago = false;
    this.formaPagoSeleccionada = '';
    this.mostrarFormularioPago = true;
    
    this.cdr.detectChanges(); // ✅ Forzar actualización inmediata

    const input = this.identificador.trim();

    this.servicioCliente.consultarClientePorId(input)
      .subscribe({
        next: (data) => {
          this.cliente = data;
          this.cargando = false;
          this.cdr.detectChanges(); // ✅ Forzar después de recibir datos
          this.verificarFormaPago();
        },
        error: () => {
          this.servicioCliente.consultarClientePorIdNacional(input)
            .subscribe({
              next: (data) => {
                this.cliente = data;
                this.cargando = false;
                this.cdr.detectChanges(); // ✅ Forzar después de recibir datos
                this.verificarFormaPago();
              },
              error: () => {
                this.cargando = false;
                this.errorMessage = 'Cliente no encontrado';
                this.cdr.detectChanges(); // ✅ Forzar actualización de error
              }
            });
        }
      });
  }

  verificarFormaPago(): void {
    if (!this.cliente) return;

    this.servicioFormaPago.consultarFormaPagoActual(this.cliente.idCliente)
      .subscribe({
        next: (data) => {
          this.formaPagoActual = data;
          this.tieneFormaPago = true;
          this.formaPagoSeleccionada = data.formaPago;
          
          if (this.tieneFormaPago) {
            this.mostrarFormularioPago = false;
          }
          
          this.cdr.detectChanges(); // ✅ Forzar actualización de UI
        },
        error: (error) => {
          if (error.status === 404) {
            this.tieneFormaPago = false;
            this.mostrarFormularioPago = true;
            this.cdr.detectChanges(); // ✅ Forzar actualización
          }
        }
      });
  }

  seleccionarFormaPago(formaPago: string): void {
    this.formaPagoSeleccionada = formaPago;
    this.cdr.detectChanges(); // ✅ Forzar actualización de selección
  }

  guardarFormaPago(): void {
    if (!this.formaPagoSeleccionada) {
      this.errorMessage = 'Seleccione una forma de pago';
      this.cdr.detectChanges();
      return;
    }

    if (!this.cliente) {
      this.errorMessage = 'Primero busque un cliente';
      this.cdr.detectChanges();
      return;
    }

    this.guardando = true;
    this.errorMessage = '';
    this.cdr.detectChanges(); // ✅ Forzar actualización de loading

    const command: FormaPagoCommand = {
      formaPago: this.formaPagoSeleccionada
    };

    if (this.tieneFormaPago) {
      this.servicioFormaPago.actualizarFormaPago(this.cliente.idCliente, command)
        .subscribe({
          next: (data) => {
            this.formaPagoActual = data;
            this.guardando = false;
            this.mostrarFormularioPago = false;
            this.cdr.detectChanges(); // ✅ Forzar después de actualizar
            alert('Forma de pago actualizada exitosamente');
          },
          error: (error) => {
            this.guardando = false;
            this.errorMessage = 'Error al actualizar forma de pago';
            this.cdr.detectChanges(); // ✅ Forzar error
            console.error(error);
          }
        });
    } else {
      this.servicioFormaPago.registrarFormaPago(this.cliente.idCliente, command)
        .subscribe({
          next: (data) => {
            this.formaPagoActual = data;
            this.tieneFormaPago = true;
            this.guardando = false;
            this.mostrarFormularioPago = false;
            this.cdr.detectChanges(); // ✅ Forzar después de registrar
            alert('Forma de pago registrada exitosamente');
          },
          error: (error) => {
            this.guardando = false;
            this.errorMessage = 'Error al registrar forma de pago';
            this.cdr.detectChanges(); // ✅ Forzar error
            console.error(error);
          }
        });
    }
  }
}