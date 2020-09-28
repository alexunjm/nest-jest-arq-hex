import { Pedido } from "src/dominio/pedido/modelo/pedido";

describe('Pedido', () => {

    const _Pedido = Pedido as any;
    let unPedido;

    beforeEach(() => {
        unPedido = new _Pedido();
    })

    it('1. un nuevo pedido deberia tener una fecha de pedido', () => {

        expect(unPedido.fecha).not.toBeUndefined();
        expect(unPedido.fecha).not.toBeNull();
    });

    it('2. un nuevo pedido NO deberia tener una fecha de pago', () => {

        expect(unPedido.fechaPago).toBeUndefined();
        expect(unPedido.fechaPago).not.toBeNull();
    });

    it('3. al marcar como pagado un pedido, debe tener fecha de pago', () => {

        unPedido.marcarComoPagado();
        expect(unPedido.fechaPago).not.toBeUndefined();
        expect(unPedido.fechaPago).not.toBeNull();
        expect(unPedido.fechaPago).toBeInstanceOf(Date);
    });

    it([
        '4. un pedido sin marcar como pagado, debe indicar que NO fue pagado',
        'entre la fecha en que se tomó el pedido y la fecha actual'
    ].join(' '), () => {

        const fechaActual = new Date();
        const resultado = unPedido.fuePagadoEnRangoDeFechas(unPedido.fecha, fechaActual);
        expect(resultado).toBe(false);
    });

    it([
        '5. un pedido con fecha de pago, debe indicar que fue pagado',
        'entre la fecha en que se tomó el pedido y la fecha actual'
    ].join(' '), () => {

        unPedido.fechaPago = new Date();
        const fechaActual = new Date();
        const resultado = unPedido.fuePagadoEnRangoDeFechas(unPedido.fecha, fechaActual);
        expect(resultado).toBe(true);
    });
});
