import { ErrorValorRequerido } from "src/dominio/errores/error-valor-requerido";
import { Fecha } from "./fecha";

export class FechaDesdeInstanciaDate extends Fecha {

    fechaTipoDate: Date;

    constructor(objetoDate: Date) {
        super(FechaDesdeInstanciaDate.datosFechaDe(objetoDate));
        this.fechaTipoDate = objetoDate;
    }

    private static datosFechaDe(objetoDate: Date): DatosFecha {
        if (!objetoDate) throw new ErrorValorRequerido(`${objetoDate} no es una fecha válida`);
        
        const anio = objetoDate.getFullYear();
        const mes = objetoDate.getMonth();
        const dia = objetoDate.getDate();
        return { anio, mes, dia };
    }
}