import { ErrorValorRequerido } from "src/dominio/errores/error-valor-requerido";
import { FechaDesdeDatosFecha } from "./fecha-desde-datos-fecha";

export class FechaDesdeInstanciaDate extends FechaDesdeDatosFecha {


    constructor(objetoDate: Date) {
        super(FechaDesdeInstanciaDate.datosFechaDe(objetoDate));
    }

    private static datosFechaDe(objetoDate: Date): DatosFecha {
        if (!objetoDate) throw new ErrorValorRequerido(`${objetoDate} no es un objeto Date válido`);
        
        const anio = objetoDate.getFullYear();
        const mes = objetoDate.getMonth() + 1;
        const dia = objetoDate.getDate();
        return { anio, mes, dia };
    }
}