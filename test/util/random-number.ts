export const numeroAleatorioEntre = (numeroInferior: number, numeroSuperior: number) => {
    const desde = numeroInferior;
    const hasta = numeroSuperior - numeroInferior;
    return Math.floor(Math.random() * hasta) + desde;
}