import { PedidoDto } from "src/aplicacion/pedido/consulta/dto/pedido.dto";

export class PedidoDtoBuilder {

    fecha: string;
    fechaPago: string;

    constructor() {
        const instanciaDateHoy = new Date();
        this.fecha = instanciaDateHoy.toISOString();
        this.fechaPago = instanciaDateHoy.toISOString();
    }

    static unPedidoDtoBuilder():PedidoDtoBuilder {
        return new PedidoDtoBuilder();
    }

    conFecha(unaInstanciaDate: Date): PedidoDtoBuilder {
        this.fecha = unaInstanciaDate.toISOString();
        return this;
    }

    conFechaPago(unaInstanciaDateParaFechaPago: Date): PedidoDtoBuilder {
        this.fechaPago = unaInstanciaDateParaFechaPago ? unaInstanciaDateParaFechaPago.toISOString(): null;
        return this;
    }

    sinFechaPago(): PedidoDtoBuilder {
        this.fechaPago = null;
        return this;
    }

    build(): PedidoDto {
        const unPedidoDto = new PedidoDto();
        unPedidoDto.fecha = this.fecha;
        unPedidoDto.fechaPago = this.fechaPago;
        return unPedidoDto;
    }
}
