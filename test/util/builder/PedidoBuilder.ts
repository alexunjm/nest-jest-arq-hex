import { Pedido } from "src/dominio/pedido/modelo/pedido";

export class PedidoBuilder {

    fecha: Date;
    fechaPago: Date;

    constructor() {
        const instanciaDateHoy = new Date();
        this.fecha = instanciaDateHoy;
        this.fechaPago = instanciaDateHoy;
    }

    static unPedidoBuilder():PedidoBuilder {
        return new PedidoBuilder();
    }

    conFecha(unaInstanciaDate: Date): PedidoBuilder {
        this.fecha = unaInstanciaDate;
        return this;
    }

    conFechaPago(unaInstanciaDateParaFechaPago: Date): PedidoBuilder {
        this.fechaPago = unaInstanciaDateParaFechaPago 
            ? unaInstanciaDateParaFechaPago: null;
        return this;
    }

    sinFechaPago(): PedidoBuilder {
        this.fechaPago = null;
        return this;
    }

    build(): Pedido {
        const unPedido = new Pedido();
        unPedido.fecha = this.fecha;
        unPedido.fechaPago = this.fechaPago;
        return unPedido;
    }
}
