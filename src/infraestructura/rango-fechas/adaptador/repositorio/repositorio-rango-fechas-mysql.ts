import { RepositorioRangoFechas } from 'src/dominio/rango-fechas/puerto/repositorio/repositorio-rango-fechas';
import { RangoFechas } from 'src/dominio/rango-fechas/modelo/rango-fechas';
import { InjectRepository } from '@nestjs/typeorm';
import { RangoFechasEntidad } from '../../entidad/rango-fechas.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioRangoFechasMysql implements RepositorioRangoFechas {
  constructor(
    @InjectRepository(RangoFechasEntidad)
    private readonly repositorio: Repository<RangoFechasEntidad>,
  ) {}

  async guardar(rangoFechas: RangoFechas) {
    const entidad = new RangoFechasEntidad();
    entidad.desde = rangoFechas.desde;
    entidad.hasta = rangoFechas.hasta;
    await this.repositorio.save(entidad);
  }
}
