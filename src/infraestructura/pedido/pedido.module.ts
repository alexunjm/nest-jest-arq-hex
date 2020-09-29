import { Module } from '@nestjs/common';
import { RangoFechasProveedorModule } from '../rango-fechas/proveedor/rango-fechas-proveedor.module';
import { PedidoControlador } from './controlador/pedido.controlador';
import { PedidoProveedorModule } from './proveedor/pedido-proveedor.module';

@Module({
  imports: [
    PedidoProveedorModule,
  ],
  controllers: [PedidoControlador],
})
export class PedidoModule {}
