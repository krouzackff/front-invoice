export interface ConsultarLiquidacionPersonal {
    id: number;
    formaDePago: string;
    estado: string;
    fechaDeCreacion: Date;
    fechaDeEntrega: Date;
    valorTotal: number;
}
