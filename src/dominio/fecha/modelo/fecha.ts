export interface Fecha extends DatosFecha {
    
    esMenorQue(fecha: Fecha): boolean;

    esIgualA(fecha: Fecha): boolean;

    esMayorQue(fecha: Fecha): boolean;
}