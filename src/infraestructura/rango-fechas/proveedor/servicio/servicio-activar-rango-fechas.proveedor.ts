import { RepositorioRangoFechas } from 'src/dominio/rango-fechas/puerto/repositorio/repositorio-rango-fechas';
import { ServicioActivarRangoFechas } from 'src/dominio/rango-fechas/servicio/servicio-activar-rango-fechas';

export function servicioActivarRangoFechasProveedor(repositorioRangoFechas: RepositorioRangoFechas) {
  return new ServicioActivarRangoFechas(repositorioRangoFechas);
}
