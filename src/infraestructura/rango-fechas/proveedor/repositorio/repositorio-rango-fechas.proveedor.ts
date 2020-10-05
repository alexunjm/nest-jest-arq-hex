import { RepositorioRangoFechas } from 'src/dominio/rango-fechas/puerto/repositorio/repositorio-rango-fechas';
import { RepositorioRangoFechasMysql } from 'src/infraestructura/rango-fechas/adaptador/repositorio/repositorio-rango-fechas-mysql';

export const repositorioRangoFechasProvider = {
  provide: RepositorioRangoFechas,
  useClass: RepositorioRangoFechasMysql,
};
