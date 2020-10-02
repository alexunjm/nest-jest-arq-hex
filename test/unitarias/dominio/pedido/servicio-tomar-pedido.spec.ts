import { SinonStubbedInstance } from "sinon";
import { DaoPedido } from "src/dominio/pedido/puerto/dao/dao-pedido";
import { RepositorioPedido } from "src/dominio/pedido/puerto/repositorio/repositorio-pedido";
import { ServicioTomarPedido } from "src/dominio/pedido/servicio/servicio-tomar-pedido";
import { DaoRangoFechas } from "src/dominio/rango-fechas/puerto/dao/dao-rango-fechas";
import { FechaBuilder, FechaDesdeDatosFechaBuilder, FechaDesdeInstanciaDateBuilder } from "test/util/builder/FechaBuilder";
import { PedidoBuilder } from "test/util/builder/PedidoBuilder";
import { PedidoDtoBuilder } from "test/util/builder/PedidoDtoBuilder";
import { createStubObj } from "test/util/create-object.stub";

describe('ServicioTomarPedido', () => {

    let daoRangoFechasStub: SinonStubbedInstance<DaoRangoFechas>;
    let daoPedidoStub: SinonStubbedInstance<DaoPedido>;
    let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;
    let servicioTomarPedido: ServicioTomarPedido;

    let unPedidoBuilder: PedidoBuilder;
    let unPedidoDtoBuilder: PedidoDtoBuilder;
    let unaFechaBuilder: FechaBuilder;
    let unaFechaDesdeDatosFechaBuilder: FechaDesdeDatosFechaBuilder;
    let unaFechaDesdeInstanciaDateBuilder: FechaDesdeInstanciaDateBuilder;
    
    let instanciaDateHoy: Date;
    let datosFechaHoy: DatosFecha;

    beforeAll(() => {
        unPedidoBuilder = PedidoBuilder.unPedidoBuilder();
        unPedidoDtoBuilder = PedidoDtoBuilder.unPedidoDtoBuilder();

        unaFechaBuilder = FechaBuilder.unaFechaBuilder();
        unaFechaDesdeDatosFechaBuilder = FechaDesdeDatosFechaBuilder.unaFechaDesdeDatosFechaBuilder();
        unaFechaDesdeInstanciaDateBuilder = FechaDesdeInstanciaDateBuilder.unaFechaDesdeInstanciaDateBuilder();
        
        instanciaDateHoy = new Date();
        datosFechaHoy = unaFechaDesdeInstanciaDateBuilder.conFechaTipoDate(instanciaDateHoy).build();
    })

    beforeEach(() => {
        daoRangoFechasStub = createStubObj<DaoRangoFechas>([
            'obtenerRangoActivo'
        ]);
        daoPedidoStub = createStubObj<DaoPedido>([
            'listar'
        ]);
        repositorioPedidoStub = createStubObj<RepositorioPedido>([
            'tomarPedido'
        ]);
        servicioTomarPedido = new ServicioTomarPedido(daoRangoFechasStub, daoPedidoStub, repositorioPedidoStub);
    });

    it([
        '1. si un cliente nuevo toma un pedido en el rango de fechas activo',
        'debería crearse el pedido'
    ].join(' '), async () => {
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: unaFechaBuilder
                    .buildConFechaDeAyer()
                    .convertirATipoString(),
                hasta: unaFechaBuilder
                    .buildConFechaDeHoy()
                    .convertirATipoString(),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve([])
        );
        const fechaCreacion = new Date();
        repositorioPedidoStub.tomarPedido.returns(
            Promise.resolve(unPedidoDtoBuilder
                .conId(1)
                .conFechaCreacion(fechaCreacion)
                .sinFechaPago()
                .build()
            )
        );

        const unNuevoPedido = unPedidoBuilder.build();
        const respuesta = await servicioTomarPedido.ejecutar(unNuevoPedido);

        expect(repositorioPedidoStub.tomarPedido.getCalls().length).toBe(1);
        expect(repositorioPedidoStub.tomarPedido.calledWith(unNuevoPedido)).toBeTruthy();
        expect(respuesta.fechaPago).toBeFalsy();
        expect(respuesta.fechaCreacion).toBe(fechaCreacion.toISOString());
        expect(respuesta.id).toBe(1);
    });

    it([
        '2. si un cliente nuevo toma un pedido FUERA del rango de fechas activo',
        'NO debería crearse el pedido'
    ].join(' '), async () => {
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: unaFechaDesdeDatosFechaBuilder
                    .conAnio(datosFechaHoy.anio)
                    .conMes(datosFechaHoy.mes)
                    .conDia(datosFechaHoy.dia - 10)
                    .build().convertirATipoString(),
                hasta: unaFechaBuilder
                    .buildConFechaDeAyer()
                    .convertirATipoString(),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve([])
        );

        const unNuevoPedido = unPedidoBuilder.build();

        await expect(
            servicioTomarPedido.ejecutar(unNuevoPedido),
        ).rejects.toThrow('No se puede tomar pedido fuera del rango de fechas activo');
    });

    it([
        '3. si un cliente toma un pedido DENTRO el rango de fechas activo',
        'y NO tiene pedidos PENDIENTES por pagar',
        'FUERA del rango de fechas activo,',
        'debería crearse el pedido y responder algo diferente de null'
    ].join(' '), async () => {
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: unaFechaBuilder
                    .buildConFechaDeAyer()
                    .convertirATipoString(),
                hasta: unaFechaBuilder
                    .buildConFechaDeHoy()
                    .convertirATipoString(),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve(
                [
                    {
                        fecha: unaFechaDesdeDatosFechaBuilder
                            .conAnio(datosFechaHoy.anio)
                            .conMes(datosFechaHoy.mes - 2)
                            .conDia(datosFechaHoy.dia)
                            .build().convertirATipoDate(),
                        fechaPago: unaFechaBuilder
                            .buildConFechaDeHaceUnMes()
                            .convertirATipoDate()
                    },
                    {
                        fecha: unaFechaBuilder
                            .buildConFechaDeHaceUnMes()
                            .convertirATipoDate(),
                        fechaPago: unaFechaBuilder
                            .buildConFechaDeHaceUnMes()
                            .convertirATipoDate()
                    },
                    {
                        fecha: unaFechaBuilder
                            .buildConFechaDeHaceUnMes()
                            .convertirATipoDate(),
                        fechaPago: unaFechaBuilder
                            .buildConFechaDeAyer()
                            .convertirATipoDate()
                    },
                    {
                        fecha: unaFechaBuilder
                            .buildConFechaDeHoy()
                            .convertirATipoDate(),
                        fechaPago: unaFechaBuilder
                            .buildConFechaDeHoy()
                            .convertirATipoDate()
                    }
                ].map(datosPedido =>
                    unPedidoDtoBuilder
                    .conFechaCreacion(datosPedido.fecha)
                    .conFechaPago(datosPedido.fechaPago)
                    .build()
                )
            )
        );
        const fechaCreacion = new Date();
        
        const resultado = unPedidoDtoBuilder
            .conId(1)
            .conFechaCreacion(fechaCreacion)
            .sinFechaPago()
            .build();
        repositorioPedidoStub.tomarPedido.returns(
            Promise.resolve(resultado)
        );

        const unNuevoPedido = unPedidoBuilder.build();

        await expect(
            servicioTomarPedido.ejecutar(unNuevoPedido),
        ).resolves.toStrictEqual(resultado);
    });

    it([
        '4. si un cliente toma un pedido DENTRO el rango de fechas activo',
        'y TIENE PEDIDOS PENDIENTES POR PAGAR tomados',
        'FUERA del rango de fechas activo,',
        'NO se depería poder crear el pedido y debería lanzar un error'
    ].join(' '), async () => {
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: unaFechaBuilder
                    .buildConFechaDeAyer()
                    .convertirATipoString(),
                hasta: unaFechaBuilder
                    .buildConFechaDeHoy()
                    .convertirATipoString(),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve([
                {
                    fecha: unaFechaDesdeDatosFechaBuilder
                        .conAnio(datosFechaHoy.anio)
                        .conMes(datosFechaHoy.mes - 2)
                        .conDia(datosFechaHoy.dia)
                        .build().convertirATipoDate(),
                    fechaPago: unaFechaBuilder
                        .buildConFechaDeHoy()
                        .convertirATipoDate()
                },
                {
                    fecha: unaFechaBuilder
                        .buildConFechaDeHaceUnMes()
                        .convertirATipoDate(),
                },
                {
                    fecha: unaFechaBuilder
                        .buildConFechaDeHoy()
                        .convertirATipoDate(),
                    fechaPago: unaFechaBuilder
                        .buildConFechaDeHoy()
                        .convertirATipoDate()
                }
            ].map(datosPedido => unPedidoDtoBuilder
                .conFechaCreacion(datosPedido.fecha)
                .conFechaPago(datosPedido.fechaPago)
                .build()
            ))
        );

        const unNuevoPedido = unPedidoBuilder.build();

        await expect(
            servicioTomarPedido.ejecutar(unNuevoPedido),
        ).rejects.toThrow('No se puede tomar el pedido porque hay un pedido pendiente por pagar');
    });

    it([
        '5. si un cliente toma un pedido DENTRO el rango de fechas activo',
        'y TIENE PEDIDOS PENDIENTES POR PAGAR tomados',
        'SOLO DENTRO del rango de fechas activo,',
        'debería crearse el pedido y responder algo diferente de null'
    ].join(' '), async () => {
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: unaFechaBuilder
                    .buildConFechaDeAyer()
                    .convertirATipoString(),
                hasta: unaFechaBuilder
                    .buildConFechaDeHoy()
                    .convertirATipoString(),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve([
                {
                    fecha: unaFechaDesdeDatosFechaBuilder
                        .conAnio(datosFechaHoy.anio)
                        .conMes(datosFechaHoy.mes - 2)
                        .conDia(datosFechaHoy.dia)
                        .build().convertirATipoDate(),
                    fechaPago: unaFechaBuilder
                        .buildConFechaDeHoy()
                        .convertirATipoDate()
                },
                {
                    fecha: unaFechaBuilder
                        .buildConFechaDeHoy()
                        .convertirATipoDate(),
                },
                {
                    fecha: unaFechaBuilder
                        .buildConFechaDeHoy()
                        .convertirATipoDate(),
                    fechaPago: unaFechaBuilder
                        .buildConFechaDeHoy()
                        .convertirATipoDate()
                }
            ].map(datosPedido => unPedidoDtoBuilder
                .conFechaCreacion(datosPedido.fecha)
                .conFechaPago(datosPedido.fechaPago)
                .build()
            ))
        );
        const fechaCreacion = new Date();
        
        const resultado = unPedidoDtoBuilder
            .conId(1)
            .conFechaCreacion(fechaCreacion)
            .sinFechaPago()
            .build();
        repositorioPedidoStub.tomarPedido.returns(
            Promise.resolve(resultado)
        );

        const unNuevoPedido = unPedidoBuilder.build();

        await expect(
            servicioTomarPedido.ejecutar(unNuevoPedido),
        ).resolves.toStrictEqual(resultado);
    });
});

