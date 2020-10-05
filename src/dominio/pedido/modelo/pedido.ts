export class Pedido {

    id: number;
    nombre: string;
    celular: string;
    direccion: string;
    detalle: string[];
    fechaCreacion: Date;
    fechaPago: Date;

    constructor(nombre: string, celular: string, direccion: string, detalle: string[]) {
        this.nombre = nombre;
        this.celular = celular;
        this.direccion = direccion;
        this.detalle = detalle;
        this.fechaCreacion = new Date();
    }
}