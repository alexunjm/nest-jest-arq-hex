import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioTomarPedido } from 'src/dominio/pedido/servicio/servicio-tomar-pedido';
import { RepositorioPedido } from 'src/dominio/pedido/puerto/repositorio/repositorio-pedido';
import { servicioTomarPedidoProveedor } from './servicio/servicio-tomar-pedido.proveedor';
import { repositorioPedidoProvider } from './repositorio/repositorio-pedido.proveedor';
import { daoPedidoProvider } from './dao/dao-pedido.proveedor';
import { ManejadorTomarPedido } from 'src/aplicacion/pedido/comando/tomar-pedido.manejador';
import { ManejadorListarPedido } from 'src/aplicacion/pedido/consulta/listar-pedidos.manejador';
import { DaoPedido } from 'src/dominio/pedido/puerto/dao/dao-pedido';
import { DaoRangoFechas } from 'src/dominio/rango-fechas/puerto/dao/dao-rango-fechas';
import { PedidoEntidad } from '../entidad/pedido.entidad';
import { RangoFechasProveedorModule } from 'src/infraestructura/rango-fechas/proveedor/rango-fechas-proveedor.module';
import { daoRangoFechasProvider } from 'src/infraestructura/rango-fechas/proveedor/dao/dao-rango-fechas.proveedor';

@Module({
  imports: [RangoFechasProveedorModule, TypeOrmModule.forFeature([PedidoEntidad])],
  providers: [
    { 
      provide: ServicioTomarPedido,
      inject: [DaoRangoFechas, DaoPedido, RepositorioPedido],
      useFactory: servicioTomarPedidoProveedor
    },
    daoRangoFechasProvider,
    daoPedidoProvider,
    repositorioPedidoProvider,
    ManejadorTomarPedido,
    ManejadorListarPedido,
    RangoFechasProveedorModule,
  ],
  exports: [
    ServicioTomarPedido,
    ManejadorTomarPedido,
    ManejadorListarPedido,
    RepositorioPedido,
    DaoPedido
  ],
})
export class PedidoProveedorModule {

}
