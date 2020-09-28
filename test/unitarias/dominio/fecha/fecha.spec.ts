import { Fecha } from "src/dominio/fecha/modelo/fecha";
import { numeroAleatorioEntre } from "test/util/random-number";

describe('Fecha', () => {

  const _Fecha = Fecha as any;
  let datosDeUnaFecha: DatosFecha;

  beforeEach(() => {
    datosDeUnaFecha = {
      anio: 2020,
      mes: 9,
      dia: 27
    };
  });

  it('una fecha cualquiera es menor que una fecha mayor a ella', () => {

    const x = numeroAleatorioEntre(1, 10);

    const unaFecha = {
      cualquiera: new _Fecha(datosDeUnaFecha),
      mayor: {
        xDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x }),
        xMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x }),
        xAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x }),
      }
    };

    expect(unaFecha.cualquiera.esMenorQue(unaFecha.mayor.xDias)).toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.mayor.xMeses)).toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.mayor.xAnios)).toBeTruthy();
  });

  it('una fecha cualquiera NO es menor que una fecha menor o igual a ella', () => {

    const x = numeroAleatorioEntre(1, 10);

    const unaFecha = {
      cualquiera: new _Fecha(datosDeUnaFecha),
      menor: {
        xDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x }),
        xMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x }),
        xAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x }),
      }
    };
    const laMismaFecha = unaFecha.cualquiera;

    expect(unaFecha.cualquiera.esMenorQue(laMismaFecha)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.menor.xDias)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.menor.xMeses)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.menor.xAnios)).not.toBeTruthy();
  });

  it('una fecha cualquiera es mayor que una fecha menor a ella', () => {

    const x = numeroAleatorioEntre(1, 10);

    const unaFecha = {
      cualquiera: new _Fecha(datosDeUnaFecha),
      menor: {
        xDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x }),
        xMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x }),
        xAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x }),
      }
    };

    expect(unaFecha.cualquiera.esMayorQue(unaFecha.menor.xDias)).toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.menor.xMeses)).toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.menor.xAnios)).toBeTruthy();
  });

  it('una fecha cualquiera NO es mayor que una fecha mayor o igual a ella', () => {

    const x = numeroAleatorioEntre(1, 10);

    const unaFecha = {
      cualquiera: new _Fecha(datosDeUnaFecha),
      mayor: {
        xDias: new _Fecha({ ...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x }),
        xMeses: new _Fecha({ ...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x }),
        xAnios: new _Fecha({ ...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x }),
      }
    };
    const laMismaFecha = unaFecha.cualquiera;

    expect(unaFecha.cualquiera.esMayorQue(laMismaFecha)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.mayor.xDias)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.mayor.xMeses)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.mayor.xAnios)).not.toBeTruthy();
  });

});
