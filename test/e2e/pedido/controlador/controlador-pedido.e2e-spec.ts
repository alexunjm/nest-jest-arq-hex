import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { PedidoControlador } from 'src/infraestructura/pedido/controlador/pedido.controlador';
import { ServicioTomarPedido } from 'src/dominio/pedido/servicio/servicio-tomar-pedido';
import { servicioTomarPedidoProveedor } from 'src/infraestructura/pedido/proveedor/servicio/servicio-tomar-pedido.proveedor';
import { ManejadorTomarPedido } from 'src/aplicacion/pedido/comando/tomar-pedido.manejador';
import { ManejadorListarPedido } from 'src/aplicacion/pedido/consulta/listar-pedidos.manejador';
import { ComandoTomarPedido } from 'src/aplicacion/pedido/comando/tomar-pedido.comando';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { DaoRangoFechas } from 'src/dominio/rango-fechas/puerto/dao/dao-rango-fechas';
import { FechaBuilder, FechaDesdeDatosFechaBuilder, FechaDesdeInstanciaDateBuilder } from 'test/util/builder/FechaBuilder';
import { PedidoDtoBuilder } from 'test/util/builder/PedidoDtoBuilder';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';
import { RangoFechasDto } from 'src/aplicacion/rango-fechas/consulta/dto/rango-fechas.dto';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de pedidos', () => {

  let app: INestApplication;
  let repositorioPedido: SinonStubbedInstance<RepositorioPedido>;
  let daoPedido: SinonStubbedInstance<DaoPedido>;
  let daoRangoFechas: SinonStubbedInstance<DaoRangoFechas>;
  
  let instanciaDateHoy: Date;
  let datosFechaHoy: DatosFecha;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    instanciaDateHoy = new Date();
    datosFechaHoy = FechaDesdeInstanciaDateBuilder.unaFechaDesdeInstanciaDateBuilder()
      .conFechaTipoDate(instanciaDateHoy).build();

    repositorioPedido = createStubObj<RepositorioPedido>(['tomarPedido'], sinonSandbox);
    daoPedido = createStubObj<DaoPedido>(['listar'], sinonSandbox);
    daoRangoFechas = createStubObj<DaoRangoFechas>([
        'obtenerRangoActivo'
    ], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [PedidoControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioTomarPedido,
          inject: [DaoRangoFechas, DaoPedido, RepositorioPedido],
          useFactory: servicioTomarPedidoProveedor,
        },
        { provide: RepositorioPedido, useValue: repositorioPedido },
        { provide: DaoPedido, useValue: daoPedido },
        { provide: DaoRangoFechas, useValue: daoRangoFechas },
        ManejadorTomarPedido,
        ManejadorListarPedido,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('1. debería listar los pedidos registrados', () => {

    const pedidos: PedidoDto[] = [
      PedidoDtoBuilder.unPedidoDtoBuilder()
      .conFechaCreacion(new Date())
      .buildAsExpectedResponse()
    ];
    daoPedido.listar.returns(Promise.resolve(pedidos));

    return request(app.getHttpServer())
      .get('/pedidos')
      .expect(HttpStatus.OK)
      .expect(pedidos);
  });

  it([
    '2. si un cliente nuevo toma un pedido en el rango de fechas activo',
    'debería crearse el pedido'
  ].join(' '), async () => {

    daoRangoFechas.obtenerRangoActivo.returns(
        Promise.resolve([{
            desde: FechaBuilder.unaFechaBuilder()
                .buildConFechaDeAyer()
                .convertirATipoDate(),
            hasta: FechaBuilder.unaFechaBuilder()
                .buildConFechaDeHoy()
                .convertirATipoDate(),
        }])
    );

    daoPedido.listar.returns(
        Promise.resolve([])
    );

    const comandoTomarPedido: ComandoTomarPedido = {
      nombre: 'Lorem ipsum', 
      celular: 'Lorem ipsum', 
      direccion: 'Lorem ipsum', 
      detalle: ['detalle1']
    };

    const fechaCreacion = new Date();
    const pedidoGuardado = PedidoDtoBuilder
      .unPedidoDtoBuilder()
      .conId(1)
      .conNombre(comandoTomarPedido.nombre)
      .conCelular(comandoTomarPedido.celular)
      .conDireccion(comandoTomarPedido.direccion)
      .conDetalle(comandoTomarPedido.detalle)
      .conFechaCreacion(fechaCreacion)
      .sinFechaPago()
      .buildAsExpectedResponse();

    repositorioPedido.tomarPedido.returns(
        Promise.resolve(pedidoGuardado)
    );

    const response = await request(app.getHttpServer())
      .post('/pedidos').send(comandoTomarPedido)
      .expect(HttpStatus.CREATED);
    expect(response.body.id).toBe(pedidoGuardado.id);
  });

  it([
    '3. si un cliente nuevo toma un pedido FUERA del rango de fechas activo',
    'NO debería crearse el pedido'
  ].join(' '), async () => {

    const rangoDeFechasHace10DiasHastaAyer: RangoFechasDto = {
      desde: FechaDesdeDatosFechaBuilder
          .unaFechaDesdeDatosFechaBuilder()
          .conAnio(datosFechaHoy.anio)
          .conMes(datosFechaHoy.mes)
          .conDia(datosFechaHoy.dia - 10)
          .build().convertirATipoDate(),
      hasta: FechaBuilder.unaFechaBuilder()
          .buildConFechaDeAyer()
          .convertirATipoDate(),
    };
    
    daoRangoFechas.obtenerRangoActivo.returns(
        Promise.resolve([rangoDeFechasHace10DiasHastaAyer])
    );

    daoPedido.listar.returns(
        Promise.resolve([])
    );

    const comandoTomarPedido: ComandoTomarPedido = {
      nombre: 'Lorem ipsum', 
      celular: 'Lorem ipsum', 
      direccion: 'Lorem ipsum', 
      detalle: ['detalle1']
    };

    const mensaje = 'No se puede tomar pedido fuera del rango de fechas activo';

    const response = await request(app.getHttpServer())
      .post('/pedidos').send(comandoTomarPedido)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
});
