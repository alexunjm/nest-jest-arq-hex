import { Pedido } from "src/dominio/pedido/modelo/pedido";

export class PedidoBuilder {

    fecha: Date;
    fechaPago: Date;

    constructor() {
        const instanciaDateHoy = new Date();
        this.fecha = instanciaDateHoy;
    }

    static unPedidoBuilder():PedidoBuilder {
        return new PedidoBuilder();
    }

    conFechaCreacion(unaInstanciaDate: Date): PedidoBuilder {
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
        const unPedido = new Pedido(
            '<nombre de prueba>',
            '<98765432101>',
            '<direccion de prueba>',
            ['<detalle de prueba>']
        );
        unPedido.fechaCreacion = this.fecha;
        unPedido.fechaPago = this.fechaPago;
        return unPedido;
    }
}
