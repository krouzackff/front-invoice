export interface LiquidacionClienteResponse {
    idLiquidacion: number;
    idPedido: number;
    idCliente: number;
    formaPago: string;
    estadoLiquidacion: string;
    fechaLiquidacion: Date;
    uriPdf: string;
    montoLiquidado: number;
}
