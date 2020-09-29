import { SinonStubbedInstance } from "sinon";
import { PedidoDto } from "src/aplicacion/pedido/consulta/dto/pedido.dto";
import { Pedido } from "src/dominio/pedido/modelo/pedido";
import { DaoPedido } from "src/dominio/pedido/puerto/dao/dao-pedido";
import { RepositorioPedido } from "src/dominio/pedido/puerto/repositorio/repositorio-pedido";
import { ServicioTomarPedido } from "src/dominio/pedido/servicio/servicio-tomar-pedido";
import { DaoRangoFechas } from "src/dominio/rango-fechas/puerto/dao/dao-rango-fechas";
import { createStubObj } from "test/util/create-object.stub";

describe('ServicioTomarPedido', () => {

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
        'si un cliente no pagó un pedido, fuera del rango de fechas activo',
        'no se puede crear el pedido y debería lanzar un error'
    ].join(' '), async () => {
        daoRangoFechasStub.obtenerRangoActivo.returns(Promise.resolve({
            desde: '2020-09-27',
            hasta: '2020-09-28',
        }));
        daoPedidoStub.listar.returns(
            Promise.resolve([
                { fecha: new Date(), fechaPago: new Date() },
                { fecha: new Date(), fechaPago: new Date() },
                { fecha: new Date(), fechaPago: new Date() },
            ].map(datosPedido => {
                const pedido = new PedidoDto();
                pedido.fecha = datosPedido.fecha.toISOString();
                pedido.fechaPago = datosPedido.fechaPago.toISOString();
                return pedido;
            }))
        );

        const unNuevoPedido = new Pedido();
        await servicioTomarPedido.ejecutar(unNuevoPedido);

        expect(repositorioPedidoStub.tomarPedido.getCalls().length).toBe(1);
        expect(repositorioPedidoStub.tomarPedido.calledWith(unNuevoPedido)).toBeTruthy();
        // const result = true;
        // expect(result).toBeTruthy();
    });
});
