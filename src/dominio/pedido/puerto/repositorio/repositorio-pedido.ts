import { Pedido } from "../../modelo/pedido";

export abstract class RepositorioPedido {
    abstract async tomarPedido(pedido: Pedido): Promise<Pedido>;
}