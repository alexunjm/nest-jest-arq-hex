import { FechaDesdeDatosFechaBuilder } from "test/util/builder/FechaBuilder";

describe('Fecha', () => {

  let datosDeUnaFecha: DatosFecha;
  const numeroX = 57;
  let unaFechaDesdeDatosFechaBuilder: FechaDesdeDatosFechaBuilder;
  let unaFecha: any;

  beforeAll(() => {
    datosDeUnaFecha = {
      anio: 2020,
      mes: 9,
      dia: 27
    };
    unaFechaDesdeDatosFechaBuilder = FechaDesdeDatosFechaBuilder.unaFechaDesdeDatosFechaBuilder();

    unaFecha = {
      cualquiera: unaFechaDesdeDatosFechaBuilder
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
  });

  it([
    '1. al crear una Fecha; ',
    'las propiedades: anio, mes y día de la fecha creada,',
    'deben ser iguales a los datosFecha'
  ].join(' '), () => {
    const unaFecha = FechaDesdeDatosFechaBuilder
      .unaFechaDesdeDatosFechaBuilder()
      .conAnio(datosDeUnaFecha.anio)
      .conMes(datosDeUnaFecha.mes)
      .conDia(datosDeUnaFecha.dia)
      .build();
    expect(unaFecha.anio).toBe(datosDeUnaFecha.anio);
    expect(unaFecha.mes).toBe(datosDeUnaFecha.mes);
    expect(unaFecha.dia).toBe(datosDeUnaFecha.dia);
  });

  it([
    '2. un primero de Octubre menos 1 día,',
    'deberia ser igual a un treinta de Septiembre'
  ].join(' '), () => {

    const unPrimeroDeOctubreMenos1Dia = FechaDesdeDatosFechaBuilder
      .unaFechaDesdeDatosFechaBuilder()
      .conAnio(2020)
      .conMes(10)
      .conDia(0)
      .build();
    const unTreintaDeSeptiembre = FechaDesdeDatosFechaBuilder
      .unaFechaDesdeDatosFechaBuilder()
      .conAnio(2020)
      .conMes(9)
      .conDia(30)
      .build();
    expect(unPrimeroDeOctubreMenos1Dia).toStrictEqual(unTreintaDeSeptiembre);
    expect(unPrimeroDeOctubreMenos1Dia.esIgualA(unTreintaDeSeptiembre)).toBeTruthy();
  });
  
  it([
    '3. un primero de Noviembre menos 1 día,',
    'deberia ser igual a un treinta y uno de Octubre'
  ].join(' '), () => {

    const unPrimeroDeNovimbreMenos1Dia = FechaDesdeDatosFechaBuilder
      .unaFechaDesdeDatosFechaBuilder()
      .conAnio(2020)
      .conMes(11)
      .conDia(0)
      .build();
    const unTreintaDeOctubre = FechaDesdeDatosFechaBuilder
      .unaFechaDesdeDatosFechaBuilder()
      .conAnio(2020)
      .conMes(10)
      .conDia(31)
      .build();
    expect(unPrimeroDeNovimbreMenos1Dia).toStrictEqual(unTreintaDeOctubre);
    expect(unPrimeroDeNovimbreMenos1Dia.esIgualA(unTreintaDeOctubre)).toBeTruthy();
  });

  it([
    '4. un primero de Enero menos un día,',
    'debe dar el último día del año anterior'
  ].join(' '), () => {

    const unPrimeroDeEneroMenos1Dia = FechaDesdeDatosFechaBuilder
      .unaFechaDesdeDatosFechaBuilder()
      .conAnio(2020)
      .conMes(1)
      .conDia(0)
      .build();
    const unTreintaYUnoDeDiciembre = FechaDesdeDatosFechaBuilder
      .unaFechaDesdeDatosFechaBuilder()
      .conAnio(2019)
      .conMes(12)
      .conDia(31)
      .build();
    expect(unPrimeroDeEneroMenos1Dia).toStrictEqual(unTreintaYUnoDeDiciembre);
    expect(unPrimeroDeEneroMenos1Dia.esIgualA(unTreintaYUnoDeDiciembre)).toBeTruthy();
  });
  
  it('5. una fecha cualquiera es menor que una fecha mayor a ella', () => {

    expect(unaFecha.cualquiera.esMenorQue(unaFecha.mayor.xDias)).toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.mayor.xMeses)).toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.mayor.xAnios)).toBeTruthy();
  });

  it('6. una fecha cualquiera NO es menor que una fecha menor o igual a ella', () => {

    const laMismaFecha = unaFecha.cualquiera;

    expect(unaFecha.cualquiera.esMenorQue(laMismaFecha)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.menor.xDias)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.menor.xMeses)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMenorQue(unaFecha.menor.xAnios)).not.toBeTruthy();
  });

  it('7. una fecha cualquiera es mayor que una fecha menor a ella', () => {

    expect(unaFecha.cualquiera.esMayorQue(unaFecha.menor.xDias)).toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.menor.xMeses)).toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.menor.xAnios)).toBeTruthy();
  });

  it('8. una fecha cualquiera NO es mayor que una fecha mayor o igual a ella', () => {
    const laMismaFecha = unaFecha.cualquiera;

    expect(unaFecha.cualquiera.esMayorQue(laMismaFecha)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.mayor.xDias)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.mayor.xMeses)).not.toBeTruthy();
    expect(unaFecha.cualquiera.esMayorQue(unaFecha.mayor.xAnios)).not.toBeTruthy();
  });

});
