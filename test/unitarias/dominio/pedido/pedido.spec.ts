import { Pedido } from "src/dominio/pedido/modelo/pedido";
import { PedidoBuilder } from "test/util/builder/PedidoBuilder";

describe('Pedido', () => {

    let unPedido: Pedido;

    beforeEach(() => {
        unPedido = PedidoBuilder.unPedidoBuilder()
        .build();
    })

    it('1. un nuevo pedido deberia tener una fecha de pedido', () => {

        expect(unPedido.fechaCreacion).not.toBeUndefined();
        expect(unPedido.fechaCreacion).not.toBeNull();
    });

    it('2. un nuevo pedido NO deberia tener una fecha de pago', () => {

        expect(unPedido.fechaPago).toBeUndefined();
        expect(unPedido.fechaPago).not.toBeNull();
    });
});
