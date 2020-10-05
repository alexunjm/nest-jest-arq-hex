import { Injectable } from '@nestjs/common';

import { DaoRangoFechas } from 'src/dominio/rango-fechas/puerto/dao/dao-rango-fechas';
import { RangoFechasDto } from 'src/aplicacion/rango-fechas/consulta/dto/rango-fechas.dto';

@Injectable()
export class ManejadorListarRangoFechas {
  constructor(private _daoRangoFechas: DaoRangoFechas) {}

  async ejecutar(): Promise<RangoFechasDto[]> {
    return this._daoRangoFechas.listar();
  }
}
