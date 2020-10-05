import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ComandoActivarRangoFechas } from 'src/aplicacion/rango-fechas/comando/activar-rango-fechas.comando';
import { ManejadorActivarRangoFechas } from 'src/aplicacion/rango-fechas/comando/activar-rango-fechas.manejador';
import { ManejadorListarRangoFechas } from 'src/aplicacion/rango-fechas/consulta/listar-rango-fechas.manejador';
import { RangoFechasDto } from 'src/aplicacion/rango-fechas/consulta/dto/rango-fechas.dto';

@Controller('rango-fechas')
export class RangoFechasControlador {
  constructor(
    private readonly _manejadorActivarRangoFechas: ManejadorActivarRangoFechas,
    private readonly _manejadorListarRangoFechas: ManejadorListarRangoFechas,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoActivarRangoFechas: ComandoActivarRangoFechas) {
    await this._manejadorActivarRangoFechas.ejecutar(comandoActivarRangoFechas);
  }

  @Get()
  async listar(): Promise<RangoFechasDto[]> {
    return this._manejadorListarRangoFechas.ejecutar();
  }
}
