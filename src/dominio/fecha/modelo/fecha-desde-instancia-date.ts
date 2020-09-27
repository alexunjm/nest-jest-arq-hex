import { Fecha } from "./fecha";

export class FechaDesdeInstanciaDate extends Fecha {

    fechaTipoDate: Date;

    constructor(unaFechaTipoDate: Date) {
        super(FechaDesdeInstanciaDate.datosFechaDe(unaFechaTipoDate));
        this.fechaTipoDate = unaFechaTipoDate;
    }
    static datosFechaDe(unaFecha: Date): DatosFecha {
        const anio = unaFecha.getFullYear();
        const mes = unaFecha.getMonth();
        const dia = unaFecha.getDate();
        return { anio, mes, dia };
    }
}