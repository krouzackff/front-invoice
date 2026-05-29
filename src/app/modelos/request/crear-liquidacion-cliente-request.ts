export interface CrearLiquidacionClienteRequest {
  idPedido: number;
  idCliente: number;
  formaPago: string;
  montoLiquidado: number;
}
