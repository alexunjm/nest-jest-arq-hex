import { Fecha } from "src/dominio/fecha/modelo/fecha";
import { FechaDesdeInstanciaDate } from "src/dominio/fecha/modelo/fecha-desde-instancia-date";

describe('RangoFechas', () => {

  const _Fecha = Fecha as any;
  const _FechaDesdeInstanciaDate = FechaDesdeInstanciaDate as any;
  let datosDeUnaFecha: DatosFecha;

  beforeEach(() => {
    datosDeUnaFecha = {
      anio: 2020,
      mes: 9,
      dia: 27
    };
  });

  it('un objeto Date (de js) debería convertirse en una intancia de Fecha', () => {
    let hoy: Date;
    hoy = new Date();
    expect(new _FechaDesdeInstanciaDate(hoy)).toBeInstanceOf(_Fecha);
  });

  it([
    'un objeto Date (de js) null o undefined NO debería poder crear una objeto',
    'tipo fecha y debería lanzar un error'
  ].join(' '), () => {
    let unObjetoDate: Date;
    const fechaDateComoNull = () => {
      unObjetoDate = null;
      new _FechaDesdeInstanciaDate(unObjetoDate);
    }
    expect(fechaDateComoNull).toThrowError(/^null/);
    const fechaDateComoUndefined = () => {
      unObjetoDate = undefined;
      new _FechaDesdeInstanciaDate(unObjetoDate);
    }
    expect(fechaDateComoUndefined).toThrowError(/^undefined/);
  });

});