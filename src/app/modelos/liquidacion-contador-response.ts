export interface LiquidacionContadorResponse {
  idLiquidacion: number;
  idPedido: number;
  tipoLiquidacion: string;
  idSujeto: number;
  monto: number;
  fechaLiquidacion: string;
  uriDocumento: string;
}