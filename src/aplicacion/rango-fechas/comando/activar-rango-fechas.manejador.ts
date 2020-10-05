import { Injectable } from '@nestjs/common';
import { ServicioActivarRangoFechas } from 'src/dominio/rango-fechas/servicio/servicio-activar-rango-fechas';
import { ComandoActivarRangoFechas } from './activar-rango-fechas.comando';
import { RangoFechas } from 'src/dominio/rango-fechas/modelo/rango-fechas';

@Injectable()
export class ManejadorActivarRangoFechas {
  constructor(private _servicioActivarRangoFechas: ServicioActivarRangoFechas) {}

  async ejecutar(comandoActivarRangoFechas: ComandoActivarRangoFechas) {
    await this._servicioActivarRangoFechas.ejecutar(
      new RangoFechas(
        comandoActivarRangoFechas.desde,
        comandoActivarRangoFechas.hasta,
        true
      ),
    );
  }
}
