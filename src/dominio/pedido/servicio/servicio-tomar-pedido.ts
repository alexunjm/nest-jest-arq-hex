import { PedidoDto } from "src/aplicacion/pedido/consulta/dto/pedido.dto";
import { ErrorDeNegocio } from "src/dominio/errores/error-de-negocio";
import { FechaDesdeInstanciaDate } from "src/dominio/fecha/modelo/fecha-desde-instancia-date";
import { RangoFechas } from "src/dominio/fecha/modelo/rango-fechas";
import { DaoRangoFechas } from "src/dominio/rango-fechas/puerto/dao/dao-rango-fechas";
import { Pedido } from "../modelo/pedido";
import { DaoPedido } from "../puerto/dao/dao-pedido";
import { RepositorioPedido } from "../puerto/repositorio/repositorio-pedido";

export class ServicioTomarPedido {

  constructor(
    private readonly _daoRangoFechas: DaoRangoFechas,
    private readonly _daoPedido: DaoPedido,
    private readonly _repositorioPedido: RepositorioPedido
  ) {
  }

  async ejecutar(pedido: Pedido): Promise<PedidoDto> {
    
    const rangoFechasActivo = await this.consultarRangoFechasActivo();
    if (!this.estaElPedidoDentroDelRangoDeFechasActivo(pedido, rangoFechasActivo)) {
      throw new ErrorDeNegocio('No se puede tomar pedido fuera del rango de fechas activo');
    }
    const listaPedidos = await this._daoPedido.listar();

    for (const unPedido of listaPedidos) {
      if (!this.estaElPedidoNoPagadoSoloDentroDelRangoDeFechasActivo(unPedido, rangoFechasActivo)){
        throw new ErrorDeNegocio('No se puede tomar el pedido porque hay un pedido pendiente por pagar');
      }
    }
    return this._repositorioPedido.tomarPedido(pedido);
  }

  private estaElPedidoNoPagadoSoloDentroDelRangoDeFechasActivo(unPedido: PedidoDto, rangoFechasActivo: RangoFechas) {
    const estaElPedidoNoPagado = unPedido.fechaPago ? false: true;
    if (estaElPedidoNoPagado) {
      const fechaPedido = new FechaDesdeInstanciaDate(unPedido.fechaCreacion);
      if (!rangoFechasActivo.incluye(fechaPedido)) return false;
    }

    return true;
  }

  private estaElPedidoDentroDelRangoDeFechasActivo(pedido: Pedido, rangoFechasActivo: RangoFechas) {
    const fechaPedido = new FechaDesdeInstanciaDate(pedido.fechaCreacion);
    return rangoFechasActivo.incluye(fechaPedido);
  }

  private async consultarRangoFechasActivo(): Promise<RangoFechas> {
    const [daoRangoFechasActivo] = await this._daoRangoFechas.obtenerRangoActivo();

    const datosFechaParaRango = this.datosFechaRango(
      daoRangoFechasActivo.desde,
      daoRangoFechasActivo.hasta
    );
    const rangoFechasActivo = new RangoFechas(datosFechaParaRango);
    return rangoFechasActivo;
  }

  private datosFechaRango(desde: Date, hasta: Date) {
    return {
      desde: new FechaDesdeInstanciaDate(desde),
      hasta: new FechaDesdeInstanciaDate(hasta)
    }
  }
}