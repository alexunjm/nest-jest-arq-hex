import { PedidoDto } from "src/aplicacion/pedido/consulta/dto/pedido.dto";
import { Pedido } from "../../modelo/pedido";

export abstract class RepositorioPedido {
    abstract async tomarPedido(pedido: Pedido): Promise<PedidoDto>;
}