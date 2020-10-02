import { PedidoDto } from "src/aplicacion/pedido/consulta/dto/pedido.dto";

export class PedidoDtoBuilder {

    id: number;
    nombre: string;
    celular: string;
    direccion: string;
    detalle: string[];
    fechaCreacion: string;
    fechaPago: string;
  
    constructor() {
        this.id = 1;
        this.nombre = '<nombre>';
        this.celular = '<celular>';
        this.direccion = '<direccion>';
        this.detalle = ['<detalle>'];
        const instanciaDateHoy = new Date();
        this.fechaCreacion = instanciaDateHoy.toISOString();
        this.fechaPago = instanciaDateHoy.toISOString();
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
        this.fechaCreacion = unaInstanciaDate.toISOString();
        return this;
    }

    conFechaPago(unaInstanciaDateParaFechaPago: Date): PedidoDtoBuilder {
        this.fechaPago = unaInstanciaDateParaFechaPago ? unaInstanciaDateParaFechaPago.toISOString(): null;
        return this;
    }

    sinFechaPago(): PedidoDtoBuilder {
        this.fechaPago = undefined;
        return this;
    }

    build(): PedidoDto {
        const unPedidoDto = new PedidoDto();
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
            fechaCreacion: this.fechaCreacion,
            fechaPago: this.fechaPago,
        };
    }
}
