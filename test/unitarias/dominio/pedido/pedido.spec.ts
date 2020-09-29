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
});
