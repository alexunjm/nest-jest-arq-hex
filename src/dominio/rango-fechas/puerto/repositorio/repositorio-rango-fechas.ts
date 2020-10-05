import { RangoFechas } from '../../modelo/rango-fechas';

export abstract class RepositorioRangoFechas {
  abstract async guardar(rangoFechas: RangoFechas);
}
