import { SinonStubbedInstance } from "sinon";
import { PedidoDto } from "src/aplicacion/pedido/consulta/dto/pedido.dto";
import { Pedido } from "src/dominio/pedido/modelo/pedido";
import { DaoPedido } from "src/dominio/pedido/puerto/dao/dao-pedido";
import { RepositorioPedido } from "src/dominio/pedido/puerto/repositorio/repositorio-pedido";
import { ServicioTomarPedido } from "src/dominio/pedido/servicio/servicio-tomar-pedido";
import { DaoRangoFechas } from "src/dominio/rango-fechas/puerto/dao/dao-rango-fechas";
import { createStubObj } from "test/util/create-object.stub";

describe('ServicioTomarPedido', () => {

    /***
     * Pendiente refactorizar utilizando patron Test Data Builder
     */
    let daoRangoFechasStub: SinonStubbedInstance<DaoRangoFechas>;
    let daoPedidoStub: SinonStubbedInstance<DaoPedido>;
    let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;
    let servicioTomarPedido: ServicioTomarPedido;

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
        const anioMesDia = anioMesDiaDeHoy();
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: objetoStringDesdeDatosFecha({
                    ...anioMesDia,
                    dia: anioMesDia.dia - 1
                }),
                hasta: objetoStringDesdeDatosFecha(anioMesDia),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve([])
        );

        const unNuevoPedido = new Pedido();
        await servicioTomarPedido.ejecutar(unNuevoPedido);

        expect(repositorioPedidoStub.tomarPedido.getCalls().length).toBe(1);
        expect(repositorioPedidoStub.tomarPedido.calledWith(unNuevoPedido)).toBeTruthy();
    });

    it([
        '2. si un cliente nuevo toma un pedido FUERA del rango de fechas activo',
        'NO debería crearse el pedido'
    ].join(' '), async () => {
        const anioMesDia = anioMesDiaDeHoy();
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: objetoStringDesdeDatosFecha({
                    ...anioMesDia,
                    dia: anioMesDia.dia - 10
                }),
                hasta: objetoStringDesdeDatosFecha({
                    ...anioMesDia,
                    dia: anioMesDia.dia - 1
                }),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve([])
        );

        const unNuevoPedido = new Pedido();

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
        const anioMesDia = anioMesDiaDeHoy();
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: objetoStringDesdeDatosFecha({
                    ...anioMesDia,
                    dia: anioMesDia.dia - 1
                }),
                hasta: objetoStringDesdeDatosFecha(anioMesDia),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve([
                {
                    fecha: objetoDateDesdeObjetoAnioMesDia({
                        ...anioMesDia,
                        mes: anioMesDia.mes - 2
                    }),
                    fechaPago: new Date()
                },
                {
                    fecha: objetoDateDesdeObjetoAnioMesDia({
                        ...anioMesDia,
                        mes: anioMesDia.mes - 1
                    }),
                    fechaPago: new Date()
                },
                { fecha: new Date(), fechaPago: new Date() },
            ].map(datosPedido => {
                const pedido = new PedidoDto();
                pedido.fecha = datosPedido.fecha.toISOString();
                pedido.fechaPago = datosPedido.fechaPago ? datosPedido.fechaPago.toISOString(): null;
                return pedido;
            }))
        );

        const unNuevoPedido = new Pedido();

        await expect(
            servicioTomarPedido.ejecutar(unNuevoPedido),
        ).resolves.not.toBeNull();
    });

    it([
        '4. si un cliente toma un pedido DENTRO el rango de fechas activo',
        'y TIENE PEDIDOS PENDIENTES POR PAGAR tomados',
        'FUERA del rango de fechas activo,',
        'NO se depbería poder crear el pedido y debería lanzar un error'
    ].join(' '), async () => {
        const anioMesDia = anioMesDiaDeHoy();
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: objetoStringDesdeDatosFecha({
                    ...anioMesDia,
                    dia: anioMesDia.dia - 1
                }),
                hasta: objetoStringDesdeDatosFecha(anioMesDia),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve([
                {
                    fecha: objetoDateDesdeObjetoAnioMesDia({
                        ...anioMesDia,
                        mes: anioMesDia.mes - 2
                    }),
                    fechaPago: new Date()
                },
                {
                    fecha: objetoDateDesdeObjetoAnioMesDia({
                        ...anioMesDia,
                        mes: anioMesDia.mes - 1
                    }),
                },
                { fecha: new Date(), fechaPago: new Date() },
            ].map(datosPedido => {
                const pedido = new PedidoDto();
                pedido.fecha = datosPedido.fecha.toISOString();
                pedido.fechaPago = datosPedido.fechaPago ? datosPedido.fechaPago.toISOString(): null;
                return pedido;
            }))
        );

        const unNuevoPedido = new Pedido();

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
        const anioMesDia = anioMesDiaDeHoy();
        daoRangoFechasStub.obtenerRangoActivo.returns(
            Promise.resolve({
                desde: objetoStringDesdeDatosFecha({
                    ...anioMesDia,
                    dia: anioMesDia.dia - 1
                }),
                hasta: objetoStringDesdeDatosFecha(anioMesDia),
            })
        );
        daoPedidoStub.listar.returns(
            Promise.resolve([
                {
                    fecha: objetoDateDesdeObjetoAnioMesDia({
                        ...anioMesDia,
                        mes: anioMesDia.mes - 2
                    }),
                    fechaPago: new Date()
                },
                {
                    fecha: objetoDateDesdeObjetoAnioMesDia({
                        ...anioMesDia,
                    }),
                },
                { fecha: new Date(), fechaPago: new Date() },
            ].map(datosPedido => {
                const pedido = new PedidoDto();
                pedido.fecha = datosPedido.fecha.toISOString();
                pedido.fechaPago = datosPedido.fechaPago ? datosPedido.fechaPago.toISOString(): null;
                return pedido;
            }))
        );

        const unNuevoPedido = new Pedido();

        await expect(
            servicioTomarPedido.ejecutar(unNuevoPedido),
        ).resolves.not.toBeNull();
    });
});

function anioMesDiaDeHoy() {
    const hoy = new Date();
    const dia = hoy.getUTCDate();
    const mes = hoy.getUTCMonth();
    const anio = hoy.getUTCFullYear();
    return { anio, mes, dia };
}

function objetoStringDesdeDatosFecha(anioMesDia: { anio: number; mes: number; dia: number; }): string {
    return `${anioMesDia.anio}-${anioMesDia.mes}-${anioMesDia.dia}`;
}

function objetoDateDesdeObjetoAnioMesDia(anioMesDia: { anio: number; mes: number; dia: number; }): Date {
    return new Date(`${anioMesDia.anio}-${anioMesDia.mes}-${anioMesDia.dia}`);
}

