import { RangoFechasDto } from "src/aplicacion/rango-fechas/consulta/dto/rango-fechas.dto";

export abstract class DaoRangoFechas {
  abstract async listar(): Promise<RangoFechasDto[]>;
  abstract async obtenerRangoActivo(): Promise<RangoFechasDto[]>;
}
