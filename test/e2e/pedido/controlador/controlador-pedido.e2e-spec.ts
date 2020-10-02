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
import { FechaBuilder } from 'test/util/builder/FechaBuilder';
import { PedidoBuilder } from 'test/util/builder/PedidoBuilder';
import { Pedido } from 'src/dominio/pedido/modelo/pedido';
import { PedidoDtoBuilder } from 'test/util/builder/PedidoDtoBuilder';
import { PedidoDto } from 'src/aplicacion/pedido/consulta/dto/pedido.dto';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de pedidos', () => {

  let app: INestApplication;
  let repositorioPedido: SinonStubbedInstance<RepositorioPedido>;
  let daoPedido: SinonStubbedInstance<DaoPedido>;
  let daoRangoFechas: SinonStubbedInstance<DaoRangoFechas>;
  
  let unaFechaBuilder: FechaBuilder;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    unaFechaBuilder = FechaBuilder.unaFechaBuilder();
    repositorioPedido = createStubObj<RepositorioPedido>(['tomarPedido'], sinonSandbox);
    daoPedido = createStubObj<DaoPedido>(['listar'], sinonSandbox);
    daoRangoFechas = createStubObj<DaoRangoFechas>([
        'obtenerRangoActivo'
    ]);
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
        Promise.resolve({
            desde: unaFechaBuilder
                .buildConFechaDeAyer()
                .convertirATipoString(),
            hasta: unaFechaBuilder
                .buildConFechaDeHoy()
                .convertirATipoString(),
        })
    );
    const pedido: ComandoTomarPedido = {
      nombre: 'Lorem ipsum', 
      celular: 'Lorem ipsum', 
      direccion: 'Lorem ipsum', 
      detalle: ['detalle1']
    };

    const response = await request(app.getHttpServer())
      .post('/pedidos').send(pedido)
      .expect(HttpStatus.CREATED);
    expect(response.body).toBe(HttpStatus.CREATED);
    expect(response.body.statusCode).toBe(HttpStatus.CREATED);
  });
/* 
  it([
    '1. si un cliente nuevo toma un pedido en el rango de fechas activo',
    'debería crearse el pedido'
  ].join(' '), async () => {
    daoRangoFechas.obtenerRangoActivo.returns(
        Promise.resolve({
            desde: unaFechaBuilder
                .buildConFechaDeAyer()
                .convertirATipoString(),
            hasta: unaFechaBuilder
                .buildConFechaDeHoy()
                .convertirATipoString(),
        })
    );
    const pedido: ComandoTomarPedido = {
      nombre: 'Lorem ipsum', 
      celular: 'Lorem ipsum', 
      direccion: 'Lorem ipsum', 
      detalle: ['detalle1']
    };
    const mensaje = 'El tamaño mínimo de la clave debe ser 4';

    const response = await request(app.getHttpServer())
      .post('/pedidos').send(pedido)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('debería fallar al tomar un pedido ya existente', async () => {
    const pedido: ComandoTomarPedido = {
      fechaCreacion: (new Date()).toISOString(),
    };
    const mensaje = `El nombre de pedido ${pedido.nombre} ya existe`;
    repositorioPedido.existeNombrePedido.returns(Promise.resolve(true));

    const response = await request(app.getHttpServer())
      .post('/pedidos').send(pedido)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  }); */
});
