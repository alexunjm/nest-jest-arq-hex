import { RangoFechasDto } from "src/aplicacion/rango-fechas/consulta/dto/rango-fechas.dto";

export abstract class DaoRangoFechas {
  abstract async obtenerRangoActivo(): Promise<RangoFechasDto>;
}
