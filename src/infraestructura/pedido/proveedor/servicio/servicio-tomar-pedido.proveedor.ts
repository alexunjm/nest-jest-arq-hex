import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { ServicioTomarPedido } from 'src/dominio/pedido/servicio/servicio-tomar-pedido';
import { DaoRangoFechas } from 'src/dominio/rango-fechas/puerto/dao/dao-rango-fechas';

export function servicioTomarPedidoProveedor(
  daoRangoFechas: DaoRangoFechas, 
  daoPedido: DaoPedido, 
  repositorioPedido: RepositorioPedido
  ) {
    
  return new ServicioTomarPedido(daoRangoFechas, daoPedido, repositorioPedido);
}
