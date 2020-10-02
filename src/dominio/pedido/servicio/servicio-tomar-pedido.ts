import { ErrorDeNegocio } from "src/dominio/errores/error-de-negocio";
import { FechaDesdeDatosFecha } from "src/dominio/fecha/modelo/fecha-desde-datos-fecha";
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

  async ejecutar(pedido: Pedido) {
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
    return await this._repositorioPedido.tomarPedido(pedido);
  }

  private estaElPedidoNoPagadoSoloDentroDelRangoDeFechasActivo(unPedido, rangoFechasActivo) {
    const estaElPedidoNoPagado = unPedido.fechaPago ? false: true;
    if (estaElPedidoNoPagado) {
      const fechaPedido = new FechaDesdeDatosFecha(this.datosFechaDesdeIsoString(unPedido.fechaCreacion));
      if (!rangoFechasActivo.incluye(fechaPedido)) return false;
    }

    return true;
  }

  private estaElPedidoDentroDelRangoDeFechasActivo(pedido: Pedido, rangoFechasActivo: RangoFechas) {
    const fechaPedido = new FechaDesdeInstanciaDate(pedido.fechaCreacion);
    return rangoFechasActivo.incluye(fechaPedido);
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
    const datosFechaDesde = this.datosFechaDesdeString(desde);
    const datosFechaHasta = this.datosFechaDesdeString(hasta);
    return {
      desde: new FechaDesdeDatosFecha(datosFechaDesde),
      hasta: new FechaDesdeDatosFecha(datosFechaHasta)
    }
  }

  private datosFechaDesdeIsoString(objetoDateString: string): DatosFecha {
    const [stringFechaHasta] = objetoDateString.split('T');
    const [anio, mes, dia] = stringFechaHasta.split('-').map(Number);
    return {
      anio,
      mes,
      dia,
    }
  }
  private datosFechaDesdeString(objetoDateString: string): DatosFecha {
    const [stringFechaHasta] = objetoDateString.split(' ');
    const [anio, mes, dia] = stringFechaHasta.split('-').map(Number);
    return {
      anio,
      mes,
      dia,
    }
  }
}