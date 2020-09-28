import { Fecha } from "src/dominio/fecha/modelo/fecha";
import { FechaDesdeInstanciaDate } from "src/dominio/fecha/modelo/fecha-desde-instancia-date";
import { RangoFechas } from "src/dominio/fecha/modelo/rango-fechas";
import { numeroAleatorioEntre } from "test/util/random-number";

describe('RangoFechas', () => {

  const _Fecha = Fecha as any;
  const _RangoFechas = RangoFechas as any;
  const _FechaDesdeInstanciaDate = FechaDesdeInstanciaDate as any;
  let datosDeUnaFecha: DatosFecha;

  beforeEach(() => {
    datosDeUnaFecha = {
      anio: 2020,
      mes: 9,
      dia: 27
    };
  });

  it('un rango de fechas incluye una fecha que esté dentro del rango', () => {
    const x = numeroAleatorioEntre(1, 10);

    const unaFecha = {
      dentroDelRango: new _Fecha(datosDeUnaFecha),
      menor: {
        xDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x }),
        xMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x }),
        xAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x }),
      },
      mayor: {
        xDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x }),
        xMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x }),
        xAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x }),
      }
    };

    const unRangoDeFechas = {
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
    const x = numeroAleatorioEntre(1, 10);

    const unaFecha = {
      menor: {
        xDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x }),
        xMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x }),
        xAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x }),
      },
      mayor: {
        xDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x }),
        xMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x }),
        xAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x }),
      }
    };

    const unaFechaFueraDelRango = {
      porIzquierda: {
        enDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x - 1 }),
        enMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x - 1 }),
        enAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x - 1 })
      },
      porDerecha: {
        enDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x + 1 }),
        enMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x + 1 }),
        enAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x + 1 })
      },
    };

    const unRangoDeFechas = {
      enDias: new _RangoFechas({
        desde: unaFecha.menor.xDias,
        hasta: unaFecha.mayor.xDias
      }),
      enMeses: new _RangoFechas({
        desde: unaFecha.menor.xDias,
        hasta: unaFecha.mayor.xDias
      }),
      enAnios: new _RangoFechas({
        desde: unaFecha.menor.xDias,
        hasta: unaFecha.mayor.xDias
      })
    };

    expect(unRangoDeFechas.enDias.incluye(unaFechaFueraDelRango.porIzquierda.enDias)).not.toBeTruthy();
    expect(unRangoDeFechas.enDias.incluye(unaFechaFueraDelRango.porDerecha.enDias)).not.toBeTruthy();

    expect(unRangoDeFechas.enMeses.incluye(unaFechaFueraDelRango.porIzquierda.enMeses)).not.toBeTruthy();
    expect(unRangoDeFechas.enMeses.incluye(unaFechaFueraDelRango.porDerecha.enMeses)).not.toBeTruthy();

    expect(unRangoDeFechas.enAnios.incluye(unaFechaFueraDelRango.porIzquierda.enAnios)).not.toBeTruthy();
    expect(unRangoDeFechas.enAnios.incluye(unaFechaFueraDelRango.porDerecha.enAnios)).not.toBeTruthy();

  });

  it('una fecha Date (de js) debería convertirse en una intancia de _Fecha', () => {
    const today = new Date();
    expect(new _FechaDesdeInstanciaDate(today)).toBeInstanceOf(_Fecha);
  });

});