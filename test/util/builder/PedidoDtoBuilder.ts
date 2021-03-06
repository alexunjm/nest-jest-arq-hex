import { PedidoDto } from "src/aplicacion/pedido/consulta/dto/pedido.dto";

export class PedidoDtoBuilder {

    id: number;
    nombre: string;
    celular: string;
    direccion: string;
    detalle: string[];
    fechaCreacion: Date;
    fechaPago: Date;
  
    constructor() {
        this.id = 1;
        this.nombre = '<nombre>';
        this.celular = '<celular>';
        this.direccion = '<direccion>';
        this.detalle = ['<detalle>'];
        const instanciaDateHoy = new Date();
        this.fechaCreacion = instanciaDateHoy;
        this.fechaPago = instanciaDateHoy;
    }

    static unPedidoDtoBuilder():PedidoDtoBuilder {
        return new PedidoDtoBuilder();
    }

    conId(id: number) {
        this.id = id;
        return this;
    }

    conNombre(nombre: string) {
        this.nombre = nombre;
        return this;
    }

    conCelular(celular: string) {
        this.celular = celular;
        return this;
    }

    conDireccion(direccion: string) {
        this.direccion = direccion;
        return this;
    }

    conDetalle(detalle: string[]) {
        this.detalle = detalle;
        return this;
    }

    conFechaCreacion(unaInstanciaDate: Date): PedidoDtoBuilder {
        this.fechaCreacion = unaInstanciaDate;
        return this;
    }

    conFechaPago(unaInstanciaDateParaFechaPago: Date): PedidoDtoBuilder {
        this.fechaPago = unaInstanciaDateParaFechaPago ? unaInstanciaDateParaFechaPago: null;
        return this;
    }

    sinFechaPago(): PedidoDtoBuilder {
        this.fechaPago = undefined;
        return this;
    }

    build(): PedidoDto {
        const unPedidoDto = new PedidoDto();
        unPedidoDto.id = this.id;
        unPedidoDto.nombre = this.nombre;
        unPedidoDto.celular = this.celular;
        unPedidoDto.direccion = this.direccion;
        unPedidoDto.detalle = this.detalle;
        unPedidoDto.fechaCreacion = this.fechaCreacion;
        unPedidoDto.fechaPago = this.fechaPago;
        return unPedidoDto;
    }

    buildAsExpectedResponse(): any {
        return {
            id: this.id,
            nombre: this.nombre,
            celular: this.celular,
            direccion: this.direccion,
            detalle: this.detalle,
            fechaCreacion: this.fechaCreacion.toISOString(),
            fechaPago: this.fechaPago ? this.fechaPago.toISOString(): undefined,
        };
    }
}
