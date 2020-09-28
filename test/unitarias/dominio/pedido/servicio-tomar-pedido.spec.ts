import { SinonStubbedInstance } from "sinon";
import { Pedido } from "src/dominio/pedido/modelo/pedido";
import { RepositorioPedido } from "src/dominio/pedido/puerto/repositorio/repositorio-pedido";
import { createStubObj } from "test/util/create-object.stub";

class ServicioTomarPedido {

    constructor(private readonly _repositorioPedido: RepositorioPedido) {
    }

    async ejecutar(pedido: Pedido) {
        //validaciones
        this._repositorioPedido.tomarPedido(pedido);
    }
}

describe('ServicioTomarPedido', () => {

    let servicioTomarPedido: ServicioTomarPedido;
    let repositorioPedidoStub: SinonStubbedInstance<RepositorioPedido>;

    beforeEach(() => {

        repositorioPedidoStub = createStubObj<RepositorioPedido>([
            'tomarPedido',
        ]);
        servicioTomarPedido = new ServicioTomarPedido(repositorioPedidoStub);
    });

    it('tomar pedido utilizando el repositorio', async () => {
        const pedido = new Pedido();

        await servicioTomarPedido.ejecutar(pedido);

        expect(repositorioPedidoStub.tomarPedido.getCalls().length).toBe(1);
        expect(repositorioPedidoStub.tomarPedido.calledWith(pedido)).toBeTruthy();
    });
});
