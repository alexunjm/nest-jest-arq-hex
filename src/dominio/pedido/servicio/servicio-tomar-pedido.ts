import { FechaDesdeDatosFecha } from "src/dominio/fecha/modelo/fecha-desde-datos-fecha";
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

  async ejecutar(pedido: Pedido) {
    const rangoFechasActivo = await this.consultarRangoFechasActivo();
    const listaPedidos = await this._daoPedido.listar();

    for (const unPedido of listaPedidos) {
      this.unPedidoPagadoEnRangoDeFechasActivo(unPedido, rangoFechasActivo)
    }
    return await this._repositorioPedido.tomarPedido(pedido);
  }

  private unPedidoPagadoEnRangoDeFechasActivo(unPedido, rangoFechasActivo) {
    if (!unPedido.fechaPago) return false;

    const fechaPagoDePedido = new FechaDesdeDatosFecha(this.datosFechaDe(unPedido.fechaPago))
    if (!rangoFechasActivo.incluye(fechaPagoDePedido)) return false;

    return true;
  }

  private async consultarRangoFechasActivo() {
    const daoRangoFechasActivo = await this._daoRangoFechas.obtenerRangoActivo();

    const datosFechaParaRango = this.datosFechaRango(
      daoRangoFechasActivo.desde,
      daoRangoFechasActivo.hasta
    );
    const rangoFechasActivo = new RangoFechas(datosFechaParaRango);
    return rangoFechasActivo;
  }

  private datosFechaRango(desde: string, hasta: string) {
    const datosFechaDesde = this.datosFechaDe(desde);
    const datosFechaHasta = this.datosFechaDe(hasta);
    return {
      desde: new FechaDesdeDatosFecha(datosFechaDesde),
      hasta: new FechaDesdeDatosFecha(datosFechaHasta)
    }
  }

  private datosFechaDe(objetoDateString: string): DatosFecha {
    const [stringFechaHasta] = objetoDateString.split(' ');
    const [anio, mes, dia] = stringFechaHasta.split('-').map(Number);
    return {
      anio,
      mes,
      dia,
    }
  }
}