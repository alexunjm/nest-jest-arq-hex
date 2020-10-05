import { Fecha } from "./fecha";

export class FechaDesdeDatosFecha implements Fecha {

    anio: number;
    mes: number;
    dia: number;
    
    constructor(datosFecha: DatosFecha) {
        const unaDate = new Date(datosFecha.anio, datosFecha.mes - 1, datosFecha.dia);
        
        this.anio = unaDate.getFullYear();
        this.mes = unaDate.getMonth() + 1;
        this.dia = unaDate.getDate();
    }

    esMenorQue(fecha: Fecha): any {
        return this.convertirATipoDate().getTime() < fecha.convertirATipoDate().getTime()
    }

    esIgualA(datosFecha: DatosFecha) {
        return this.anio === datosFecha.anio &&
            this.mes === datosFecha.mes &&
            this.dia === datosFecha.dia;
    }

    esMayorQue(fecha: Fecha): any {
        return this.convertirATipoDate().getTime() > fecha.convertirATipoDate().getTime()
    }

    convertirATipoString(): string {
        return `${this.anio}-${this.mes}-${this.dia}`;
    }

    convertirATipoDate(): Date {
        return new Date(`${this.anio}-${this.mes}-${this.dia}`);
    }

}