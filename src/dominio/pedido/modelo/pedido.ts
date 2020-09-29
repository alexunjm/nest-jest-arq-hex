import { FechaDesdeInstanciaDate } from "src/dominio/fecha/modelo/fecha-desde-instancia-date";
import { RangoFechas } from "src/dominio/fecha/modelo/rango-fechas";

export class Pedido {

    id: number;
    fecha: Date;
    fechaPago: Date;

    constructor() {
        this.fecha = new Date();
    }
}