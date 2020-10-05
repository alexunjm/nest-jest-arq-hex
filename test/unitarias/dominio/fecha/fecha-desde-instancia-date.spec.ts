import { Fecha } from "src/dominio/fecha/modelo/fecha";
import { FechaDesdeInstanciaDate } from "src/dominio/fecha/modelo/fecha-desde-instancia-date";
import { FechaDesdeInstanciaDateBuilder } from "test/util/builder/FechaBuilder";

describe('FechaDesdeInstanciaDate', () => {


  it('un objeto Date (de js) debería convertirse en una intancia de Fecha', () => {
    const hoy = new Date();
    const unaFecha: Fecha = FechaDesdeInstanciaDateBuilder
      .unaFechaDesdeInstanciaDateBuilder()
      .conFechaTipoDate(hoy).build();
    expect(unaFecha).toBeInstanceOf(FechaDesdeInstanciaDate);
  });

  it([
    'un objeto Date (de js) null o undefined NO debería poder crear una objeto',
    'tipo fecha y debería lanzar un error'
  ].join(' '), () => {
    const fechaDateComoNull = () => {
      FechaDesdeInstanciaDateBuilder
      .unaFechaDesdeInstanciaDateBuilder()
      .conFechaTipoDate(null).build();
    }
    expect(fechaDateComoNull).toThrowError(/^null/);
    const fechaDateComoUndefined = () => {
      FechaDesdeInstanciaDateBuilder
      .unaFechaDesdeInstanciaDateBuilder()
      .conFechaTipoDate(undefined).build();
    }
    expect(fechaDateComoUndefined).toThrowError(/^undefined/);
  });

});