import { Pedido } from "../modelo/pedido";
import { RepositorioPedido } from "../puerto/repositorio/repositorio-pedido";

export class ServicioMarcarPedidoComoPagado {
    
  constructor(private readonly _repositorioPedido: RepositorioPedido) {
  }

  async ejecutar(pedido: Pedido) {
    return await this._repositorioPedido.marcarComoPagado(pedido.id);
  }
}