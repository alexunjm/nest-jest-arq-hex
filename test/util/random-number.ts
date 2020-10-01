export const numeroAleatorioEntre = (numeroInferior: number, numeroSuperior: number) => {
    const desde = numeroInferior;
    const hasta = numeroSuperior - numeroInferior + 1;
    return Math.floor(Math.random() * hasta) + desde;
}