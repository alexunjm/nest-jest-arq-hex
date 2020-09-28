import { Fecha } from "./fecha";

export class FechaDesdeDatosFecha implements Fecha {

    anio: number;
    mes: number;
    dia: number;

    constructor(datosFecha: DatosFecha) {
        this.anio = datosFecha.anio;
        this.mes = datosFecha.mes;
        this.dia = datosFecha.dia;
    }

    esMenorQue(fecha: Fecha): any {
        return !this.esIgualA(fecha) &&
            this.anio <= fecha.anio &&
            this.mes <= fecha.mes &&
            this.dia <= fecha.dia;
    }

    esIgualA(datosFecha: DatosFecha) {
        return this.anio === datosFecha.anio &&
            this.mes === datosFecha.mes &&
            this.dia === datosFecha.dia;
    }

    esMayorQue(fecha: Fecha): any {
        return !this.esIgualA(fecha) &&
            this.anio >= fecha.anio &&
            this.mes >= fecha.mes &&
            this.dia >= fecha.dia;
    }
}