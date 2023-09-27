export default class FGTSCalculator {
  constructor(salarioMensal) {
    if (salarioMensal < 0) {
      throw new Error('Salário mensal inválido.');
    }

    this.salarioMensal = parseFloat(salarioMensal);
  }

  calcularFGTS() {
    const taxaFGTS = 0.08; // Taxa de 8%
    const valorFGTS = this.salarioMensal * taxaFGTS;

    const resultados = {
      'Salário mensal': this.salarioMensal,
      'Valor do FGTS': valorFGTS,
      'Valor a receber': valorFGTS,
    };
    return resultados;
  }
}
