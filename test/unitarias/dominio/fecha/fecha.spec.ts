const aleatorioEntre = (numeroInferior: number, numeroSuperior: number) => {
  const desde = numeroInferior;
  const hasta = numeroSuperior - numeroInferior;
  return Math.floor(Math.random() * hasta) + desde;
}

describe('ZZZsss', () => {

  let datosDeUnaFecha: DatosFecha;

  beforeEach(() => {
    datosDeUnaFecha = {
      anio: 2020,
      mes: 9,
      dia: 27
    };
  });

  it('1. una fecha cualquiera es menor que una fecha mayor a ella', () => {

    const x = aleatorioEntre(1, 10);

    const unaFecha = {
      cualquiera: new Fecha(datosDeUnaFecha),
      mayor: {
        xDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x}),
        xMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x}),
        xAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x}),
      }
    };

    expect(unaFecha.cualquiera.esMenorQue(unaFecha.mayor.xDias)).toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.mayor.xMeses)).toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.mayor.xAnios)).toBeTruthy();
  });

  it('2. una fecha cualquiera NO es menor que una fecha menor o igual a ella', () => {

    const x = aleatorioEntre(1, 10);

    const unaFecha = {
      cualquiera: new Fecha(datosDeUnaFecha),
      menor: {
        xDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x}),
        xMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x}),
        xAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x}),
    }
    };
    const laMismaFecha = unaFecha.cualquiera;

    expect(unaFecha.cualquiera.esMenorQue(laMismaFecha)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.menor.xDias)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.menor.xMeses)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.menor.xAnios)).not.toBeTruthy();
  });

  it('3. una fecha cualquiera es mayor que una fecha menor a ella', () => {

    const x = aleatorioEntre(1, 10);

    const unaFecha = {
      cualquiera: new Fecha(datosDeUnaFecha),
      menor: {
        xDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x}),
        xMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x}),
        xAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x}),
    }
    };

    expect(unaFecha.cualquiera.esMayorQue(unaFecha.menor.xDias)).toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.menor.xMeses)).toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.menor.xAnios)).toBeTruthy();
  });

  it('4. una fecha cualquiera NO es mayor que una fecha mayor o igual a ella', () => {

    const x = aleatorioEntre(1, 10);

    const unaFecha = {
      cualquiera: new Fecha(datosDeUnaFecha),
      mayor: {
        xDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x}),
        xMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x}),
        xAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x}),
      }
    };
    const laMismaFecha = unaFecha.cualquiera;

    expect(unaFecha.cualquiera.esMayorQue(laMismaFecha)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.mayor.xDias)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.mayor.xMeses)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.mayor.xAnios)).not.toBeTruthy();
  });

  it('5. un rango de fechas incluye una fecha que esté dentro del rango', () => {
    const x = aleatorioEntre(1, 10);

    const unaFecha = {
      dentroDelRango: new Fecha(datosDeUnaFecha),
      menor: {
        xDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x}),
        xMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x}),
        xAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x}),
      },
      mayor: {
        xDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x}),
        xMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x}),
        xAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x}),
      }
    };

    const unRangoDeFechas = {
      enDias: new RangoFechas({ 
        desde: unaFecha.menor.xDias, 
        hasta: unaFecha.mayor.xDias
      }),
      enMeses: new RangoFechas({ 
        desde: unaFecha.menor.xMeses, 
        hasta: unaFecha.mayor.xMeses
      }),
      enAnios: new RangoFechas({ 
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

  it('6. un rango de fechas NO incluye una fecha fuera del rango', () => {
    const x = aleatorioEntre(1, 10);

    const unaFecha = {
      menor: {
        xDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x}),
        xMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x}),
        xAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x}),
      },
      mayor: {
        xDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x}),
        xMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x}),
        xAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x}),
      }
    };

    const unaFechaFueraDelRango = {
      porIzquierda: {
        enDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia - x - 1}),
        enMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes - x - 1}),
        enAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio - x - 1})
      },
      porDerecha: {
        enDias: new Fecha({...datosDeUnaFecha, dia: datosDeUnaFecha.dia + x + 1}),
        enMeses: new Fecha({...datosDeUnaFecha, mes: datosDeUnaFecha.mes + x + 1}),
        enAnios: new Fecha({...datosDeUnaFecha, anio: datosDeUnaFecha.anio + x + 1})
      },
    };

    const unRangoDeFechas = {
      enDias: new RangoFechas({ 
        desde: unaFecha.menor.xDias, 
        hasta: unaFecha.mayor.xDias
      }),
      enMeses: new RangoFechas({ 
        desde: unaFecha.menor.xDias, 
        hasta: unaFecha.mayor.xDias
      }),
      enAnios: new RangoFechas({ 
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
});

type DatosFecha = {
  anio: number;
  mes: number;
  dia: number;
};

class Fecha {

  anio: number;
  mes: number;
  dia: number;

  constructor(datosFecha: DatosFecha) {
    this.anio = datosFecha.anio;
    this.mes = datosFecha.mes;
    this.dia = datosFecha.dia;
  }

  esMenorQue(fecha: Fecha): any {
    return !this.esIgualA(fecha) &&
      this.anio <= fecha.anio &&
      this.mes <= fecha.mes &&
      this.dia <= fecha.dia;
  }

  esIgualA(fecha: Fecha) {
    return this.anio === fecha.anio &&
      this.mes === fecha.mes &&
      this.dia === fecha.dia;
  }

  esMayorQue(fecha: Fecha): any {
    return !this.esIgualA(fecha) &&
      this.anio >= fecha.anio &&
      this.mes >= fecha.mes &&
      this.dia >= fecha.dia;
  }
}

class RangoFechas {

  desde: Fecha;
  hasta: Fecha;

  constructor({ desde, hasta }: { desde?: Fecha; hasta?: Fecha; }) {
    this.desde = desde;
    this.hasta = hasta;
  }

  incluye(fecha: Fecha) {
    return this.incluyeSinTomarExtremos(fecha) ||
      this.desde.esIgualA(fecha) ||
      this.hasta.esIgualA(fecha);
  }

  private incluyeSinTomarExtremos(fecha: Fecha) {
    return this.desde.esMenorQue(fecha) &&
      this.hasta.esMayorQue(fecha);
  }
}