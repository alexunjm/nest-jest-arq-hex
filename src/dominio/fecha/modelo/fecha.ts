export class Fecha {

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

    esIgualA(fecha: Fecha) {
        return this.anio === fecha.anio &&
            this.mes === fecha.mes &&
            this.dia === fecha.dia;
    }

    esMayorQue(fecha: Fecha): any {
        return !this.esIgualA(fecha) &&
            this.anio >= fecha.anio &&
            this.mes >= fecha.mes &&
            this.dia >= fecha.dia;
    }
}