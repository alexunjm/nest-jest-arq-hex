import { RepositorioRangoFechas } from '../puerto/repositorio/repositorio-rango-fechas';
import { RangoFechas } from '../modelo/rango-fechas';

export class ServicioActivarRangoFechas {

  constructor(private readonly _repositorioRangoFechas: RepositorioRangoFechas) {
  }

  async ejecutar(rangoFechas: RangoFechas) {
    await this._repositorioRangoFechas.guardar(rangoFechas);
  }
}
