import { Fecha } from "src/dominio/fecha/modelo/fecha";
import { FechaDesdeDatosFecha } from "src/dominio/fecha/modelo/fecha-desde-datos-fecha";
import { FechaDesdeInstanciaDate } from "src/dominio/fecha/modelo/fecha-desde-instancia-date";

export class FechaDesdeDatosFechaBuilder {

    anio: number;
    mes: number;
    dia: number;

    constructor() {
        this.anio = 2020;
        this.mes = 2;
        this.dia = 20;
    }

    static unaFechaDesdeDatosFechaBuilder():FechaDesdeDatosFechaBuilder {
        return new FechaDesdeDatosFechaBuilder();
    }

    conAnio(unAnio: number): FechaDesdeDatosFechaBuilder {
        this.anio = unAnio;
        return this;
    }

    conMes(unMes: number): FechaDesdeDatosFechaBuilder {
        this.mes = unMes;
        return this;
    }

    conDia(unDia: number): FechaDesdeDatosFechaBuilder {
        this.dia = unDia;
        return this;
    }

    build(): Fecha {
        const datosFecha: DatosFecha = {
            anio: this.anio, 
            mes: this.mes, 
            dia: this.dia
        };
        return new FechaDesdeDatosFecha(datosFecha);
    }
}

export class FechaDesdeInstanciaDateBuilder {

    fechaTipoDate: Date;

    constructor() {
        this.fechaTipoDate = new Date();
    }

    static unaFechaDesdeInstanciaDateBuilder():FechaDesdeInstanciaDateBuilder {
        return new FechaDesdeInstanciaDateBuilder();
    }

    conFechaTipoDate(instanciaDate: Date) {
        this.fechaTipoDate = instanciaDate;
        return this;
    }

    build(): Fecha {
        return new FechaDesdeInstanciaDate(this.fechaTipoDate);
    }

}

export class FechaBuilder {

    static unaFechaBuilder():FechaBuilder {
        return new FechaBuilder();
    }

    buildConFechaDeHoy(): Fecha {
        return FechaDesdeInstanciaDateBuilder
        .unaFechaDesdeInstanciaDateBuilder()
        .conFechaTipoDate(new Date()).build();
    }

    buildConFechaDeAyer(): Fecha {
        const fechaDeHoy = this.buildConFechaDeHoy();
        return FechaDesdeDatosFechaBuilder
        .unaFechaDesdeDatosFechaBuilder()
        .conAnio(fechaDeHoy.anio)
        .conMes(fechaDeHoy.mes)
        .conDia(fechaDeHoy.dia - 1)
        .build();
    }

    buildConFechaDeHaceUnMes(): Fecha {
        const fechaDeHoy = this.buildConFechaDeHoy();
        return FechaDesdeDatosFechaBuilder
        .unaFechaDesdeDatosFechaBuilder()
        .conAnio(fechaDeHoy.anio)
        .conMes(fechaDeHoy.mes - 1)
        .conDia(fechaDeHoy.dia)
        .build();
    }

}