import { Module } from '@nestjs/common';
import { ServicioActivarRangoFechas } from 'src/dominio/rango-fechas/servicio/servicio-activar-rango-fechas';
import { RepositorioRangoFechas } from 'src/dominio/rango-fechas/puerto/repositorio/repositorio-rango-fechas';
import { servicioActivarRangoFechasProveedor } from './servicio/servicio-activar-rango-fechas.proveedor';
import { repositorioRangoFechasProvider } from './repositorio/repositorio-rango-fechas.proveedor';
import { daoRangoFechasProvider } from './dao/dao-rango-fechas.proveedor';
import { ManejadorActivarRangoFechas } from 'src/aplicacion/rango-fechas/comando/activar-rango-fechas.manejador';
import { ManejadorListarRangoFechas } from 'src/aplicacion/rango-fechas/consulta/listar-rango-fechas.manejador';
import { DaoRangoFechas } from 'src/dominio/rango-fechas/puerto/dao/dao-rango-fechas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RangoFechasEntidad } from '../entidad/rango-fechas.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([RangoFechasEntidad])],
  providers: [
    { provide: ServicioActivarRangoFechas, inject: [RepositorioRangoFechas], useFactory: servicioActivarRangoFechasProveedor },
    repositorioRangoFechasProvider,
    daoRangoFechasProvider,
    ManejadorActivarRangoFechas,
    ManejadorListarRangoFechas,
  ],
  exports: [
    ServicioActivarRangoFechas,
    ManejadorActivarRangoFechas,
    ManejadorListarRangoFechas,
    RepositorioRangoFechas,
    DaoRangoFechas,
  ],
})
export class RangoFechasProveedorModule {

}
