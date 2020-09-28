import { FechaDesdeDatosFecha } from "src/dominio/fecha/modelo/fecha-desde-datos-fecha";
import { FechaDesdeInstanciaDate } from "src/dominio/fecha/modelo/fecha-desde-instancia-date";
import { RangoFechas } from "src/dominio/fecha/modelo/rango-fechas";
import { numeroAleatorioEntre } from "test/util/random-number";

describe('RangoFechas', () => {

  const _FechaDesdeDatosFecha = FechaDesdeDatosFecha as any;
  const _RangoFechas = RangoFechas as any;

  let datosDeUnaFecha: DatosFecha;
  let unaFecha: any;
  let unRangoDeFechas: any;
  const numeroX = numeroAleatorioEntre(1, 10);

  beforeAll(() => {
    datosDeUnaFecha = {
      anio: 2020,
      mes: 9,
      dia: 27
    };

    unaFecha = {
      dentroDelRango: new _FechaDesdeDatosFecha(datosDeUnaFecha),
      menor: {
        xDias: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia - numeroX }),
        xMeses: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes - numeroX }),
        xAnios: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio - numeroX }),
      },
      mayor: {
        xDias: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia + numeroX }),
        xMeses: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes + numeroX }),
        xAnios: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio + numeroX }),
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

  it('un rango de fechas incluye una fecha que esté dentro del rango', () => {

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

  it('un rango de fechas NO incluye una fecha fuera del rango', () => {

    const unaFechaFueraDelRango = {
      porIzquierda: {
        enDias: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia - numeroX - 1 }),
        enMeses: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes - numeroX - 1 }),
        enAnios: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio - numeroX - 1 })
      },
      porDerecha: {
        enDias: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia + numeroX + 1 }),
        enMeses: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes + numeroX + 1 }),
        enAnios: new _FechaDesdeDatosFecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio + numeroX + 1 })
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