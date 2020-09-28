import { Fecha } from "src/dominio/fecha/modelo/fecha";
import { FechaDesdeInstanciaDate } from "src/dominio/fecha/modelo/fecha-desde-instancia-date";

describe('FechaDesdeInstanciaDate', () => {

  const _FechaDesdeInstanciaDate = FechaDesdeInstanciaDate as any;

  it('un objeto Date (de js) debería convertirse en una intancia de Fecha', () => {
    let hoy: Date;
    hoy = new Date();
    const unaFecha: Fecha = new _FechaDesdeInstanciaDate(hoy);
    expect(unaFecha).toBeInstanceOf(_FechaDesdeInstanciaDate);
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