import { RangoFechas } from "src/dominio/fecha/modelo/rango-fechas";
import { FechaDesdeDatosFechaBuilder } from "test/util/builder/FechaBuilder";

describe('RangoFechas', () => {

  const _RangoFechas = RangoFechas as any;

  let datosDeUnaFecha: DatosFecha;
  let unaFecha: any;
  let unRangoDeFechas: any;
  const numeroX = 57;
  let unaFechaDesdeDatosFechaBuilder: FechaDesdeDatosFechaBuilder;

  beforeAll(() => {
    
    datosDeUnaFecha = {
      anio: 2020,
      mes: 9,
      dia: 27
    };
    
    unaFechaDesdeDatosFechaBuilder = FechaDesdeDatosFechaBuilder.unaFechaDesdeDatosFechaBuilder();

    unaFecha = {
      dentroDelRango: unaFechaDesdeDatosFechaBuilder
        .conAnio(datosDeUnaFecha.anio)
        .conMes(datosDeUnaFecha.mes)
        .conDia(datosDeUnaFecha.dia)
        .build(),
      menor: {
        xDias: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio)
          .conMes(datosDeUnaFecha.mes)
          .conDia(datosDeUnaFecha.dia - numeroX)
          .build(),
        xMeses: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio)
          .conMes(datosDeUnaFecha.mes - numeroX)
          .conDia(datosDeUnaFecha.dia)
          .build(),
        xAnios: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio - numeroX)
          .conMes(datosDeUnaFecha.mes)
          .conDia(datosDeUnaFecha.dia)
          .build()
      },
      mayor: {
        xDias: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio)
          .conMes(datosDeUnaFecha.mes)
          .conDia(datosDeUnaFecha.dia + numeroX)
          .build(),
        xMeses: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio)
          .conMes(datosDeUnaFecha.mes + numeroX)
          .conDia(datosDeUnaFecha.dia)
          .build(),
        xAnios: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio + numeroX)
          .conMes(datosDeUnaFecha.mes)
          .conDia(datosDeUnaFecha.dia)
          .build()
      }
    };

    unRangoDeFechas = {
      enDias: new _RangoFechas({
        desde: unaFecha.menor.xDias,
        hasta: unaFecha.mayor.xDias
      }),
      enMeses: new _RangoFechas({
        desde: unaFecha.menor.xMeses,
        hasta: unaFecha.mayor.xMeses
      }),
      enAnios: new _RangoFechas({
        desde: unaFecha.menor.xAnios,
        hasta: unaFecha.mayor.xAnios
      })
    };
  });

  it('1. un rango de fechas incluye una fecha que esté dentro del rango', () => {

    expect(unRangoDeFechas.enDias.incluye(unaFecha.menor.xDias)).toBeTruthy();
    expect(unRangoDeFechas.enDias.incluye(unaFecha.dentroDelRango)).toBeTruthy();
    expect(unRangoDeFechas.enDias.incluye(unaFecha.mayor.xDias)).toBeTruthy();

    expect(unRangoDeFechas.enMeses.incluye(unaFecha.menor.xMeses)).toBeTruthy();
    expect(unRangoDeFechas.enMeses.incluye(unaFecha.dentroDelRango)).toBeTruthy();
    expect(unRangoDeFechas.enMeses.incluye(unaFecha.mayor.xMeses)).toBeTruthy();

    expect(unRangoDeFechas.enAnios.incluye(unaFecha.menor.xAnios)).toBeTruthy();
    expect(unRangoDeFechas.enAnios.incluye(unaFecha.dentroDelRango)).toBeTruthy();
    expect(unRangoDeFechas.enAnios.incluye(unaFecha.mayor.xAnios)).toBeTruthy();

  });

  it('2. un rango de fechas NO incluye una fecha fuera del rango', () => {

    const unaFechaFueraDelRango = {
      porIzquierda: {
        enDias: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio)
          .conMes(datosDeUnaFecha.mes)
          .conDia(datosDeUnaFecha.dia - numeroX - 1)
          .build(),
        enMeses: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio)
          .conMes(datosDeUnaFecha.mes - numeroX - 1)
          .conDia(datosDeUnaFecha.dia)
          .build(),
        enAnios: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio - numeroX - 1)
          .conMes(datosDeUnaFecha.mes)
          .conDia(datosDeUnaFecha.dia)
          .build()
      },
      porDerecha: {
        enDias: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio)
          .conMes(datosDeUnaFecha.mes)
          .conDia(datosDeUnaFecha.dia + numeroX + 1)
          .build(),
        enMeses: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio)
          .conMes(datosDeUnaFecha.mes + numeroX + 1)
          .conDia(datosDeUnaFecha.dia)
          .build(),
        enAnios: unaFechaDesdeDatosFechaBuilder
          .conAnio(datosDeUnaFecha.anio + numeroX + 1)
          .conMes(datosDeUnaFecha.mes)
          .conDia(datosDeUnaFecha.dia)
          .build()
      },
    };

    expect(unRangoDeFechas.enDias.incluye(unaFechaFueraDelRango.porIzquierda.enDias)).not.toBeTruthy();
    expect(unRangoDeFechas.enDias.incluye(unaFechaFueraDelRango.porDerecha.enDias)).not.toBeTruthy();

    expect(unRangoDeFechas.enMeses.incluye(unaFechaFueraDelRango.porIzquierda.enMeses)).not.toBeTruthy();
    expect(unRangoDeFechas.enMeses.incluye(unaFechaFueraDelRango.porDerecha.enMeses)).not.toBeTruthy();

    expect(unRangoDeFechas.enAnios.incluye(unaFechaFueraDelRango.porIzquierda.enAnios)).not.toBeTruthy();
    expect(unRangoDeFechas.enAnios.incluye(unaFechaFueraDelRango.porDerecha.enAnios)).not.toBeTruthy();

  });

});