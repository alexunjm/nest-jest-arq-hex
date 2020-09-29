import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoRangoFechas } from 'src/dominio/rango-fechas/puerto/dao/dao-rango-fechas';
import { RangoFechasDto } from 'src/aplicacion/rango-fechas/consulta/dto/rango-fechas.dto';

@Injectable()
export class DaoRangoFechasMysql implements DaoRangoFechas {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  obtenerRangoActivo(): Promise<RangoFechasDto> {
    return this.entityManager.query(
      [
        'SELECT rf.desde, rf.hasta ',
        'FROM `rango-fechas` rf',
        'WHERE rf.activo === true'
      ].join(' '),
    );
  }

  async listar(): Promise<RangoFechasDto[]> {
    return this.entityManager.query(
      'SELECT rf.desde, rf.hasta FROM `rango-fechas` rf',
    );
  }
}
