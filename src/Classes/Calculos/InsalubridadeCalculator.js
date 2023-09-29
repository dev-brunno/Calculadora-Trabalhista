class InsalubridadeCalculator {
  constructor(salarioBase, grauInsalubridade) {
    if (salarioBase < 0 || !['10', '20', '40'].includes(grauInsalubridade)) {
      throw new Error('Valores inválidos.');
    }

    this.salarioBase = parseFloat(salarioBase);
    this.grauInsalubridade = grauInsalubridade;
  }

  calcularInsalubridade() {
    const grauInsalubridadeText = {
      10: 'Grau Mínimo (10%)',
      20: 'Grau Médio (20%)',
      40: 'Grau Máximo (40%)',
    };

    const percentuais = {
      10: 0.1,
      20: 0.2,
      40: 0.4,
    };

    const percentual = percentuais[this.grauInsalubridade];
    const valorInsalubridade = this.salarioBase * percentual;

    const resultado = {
      'Salário Base': this.salarioBase,
      'Grau de Insalubridade': grauInsalubridadeText[this.grauInsalubridade],
      'Valor do Adicional de Insalubridade': valorInsalubridade,
    };

    const valorAReceber = {
      'Valor a Receber': this.salarioBase + valorInsalubridade,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}

export default InsalubridadeCalculator;
