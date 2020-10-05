import { Fecha } from "./fecha";

export class RangoFechas {

    desde: Fecha;
    hasta: Fecha;

    constructor({ desde, hasta }: { desde?: Fecha; hasta?: Fecha; }) {
        this.desde = desde;
        this.hasta = hasta;
    }

    incluye(fecha: Fecha) {
        return this.incluyeSinTomarExtremos(fecha) ||
            this.desde.esIgualA(fecha) ||
            this.hasta.esIgualA(fecha);
    }

    private incluyeSinTomarExtremos(fecha: Fecha) {
        return this.desde.esMenorQue(fecha) &&
            this.hasta.esMayorQue(fecha);
    }
}