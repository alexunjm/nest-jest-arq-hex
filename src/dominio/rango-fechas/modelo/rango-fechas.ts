export class RangoFechas {
  readonly #desde: Date;
  readonly #hasta: Date;
  readonly #activo: boolean;

  constructor(desde: Date, hasta: Date, activo: boolean) {
    this.#desde = new Date(desde);
    this.#hasta = new Date(hasta);
    this.#activo = activo;
  }

  get desde(): Date {
    return this.#desde;
  }

  get hasta(): Date {
    return this.#hasta;
  }

  get activo(): boolean {
    return this.#activo;
  }
}
