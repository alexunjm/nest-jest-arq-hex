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

  it('una fecha Date (de js) debería convertirse en una intancia de _Fecha', () => {
    const today = new Date();
    expect(new _FechaDesdeInstanciaDate(today)).toBeInstanceOf(_Fecha);
  });

});