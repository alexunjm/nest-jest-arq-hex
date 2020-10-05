import { DaoRangoFechas } from 'src/dominio/rango-fechas/puerto/dao/dao-rango-fechas';
import { DaoRangoFechasMysql } from 'src/infraestructura/rango-fechas/adaptador/dao/dao-rango-fechas-mysql';

export const daoRangoFechasProvider = {
  provide: DaoRangoFechas,
  useClass: DaoRangoFechasMysql,
};
