import { Module } from '@nestjs/common';
import { RangoFechasControlador } from './controlador/rango-fechas.controlador';
import { RangoFechasProveedorModule } from './proveedor/rango-fechas-proveedor.module';

@Module({
  imports: [
    RangoFechasProveedorModule
  ],
  controllers: [RangoFechasControlador],
})
export class RangoFechasModule {}
