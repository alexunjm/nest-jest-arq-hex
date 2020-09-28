import { FechaDesdeInstanciaDate } from "src/dominio/fecha/modelo/fecha-desde-instancia-date";
import { RangoFechas } from "src/dominio/fecha/modelo/rango-fechas";

export class Pedido {

    id: number;
    fecha: Date;
    fechaPago: Date;

    constructor() {
        this.fecha = new Date();
    }

    marcarComoPagado() {
        this.fechaPago = new Date();
    }

    fuePagadoEnRangoDeFechas(fechaInicio: Date, fechaFin: Date) {
        if (!this.fechaPago) return false;

        const desde = new FechaDesdeInstanciaDate(fechaInicio);
        const hasta = new FechaDesdeInstanciaDate(fechaFin);

        const rangoFechas = new RangoFechas({ desde, hasta });

        const fechaPedidoPagado = new FechaDesdeInstanciaDate(this.fechaPago);
        return rangoFechas.incluye(fechaPedidoPagado);
    }
}