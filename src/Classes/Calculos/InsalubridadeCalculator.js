class InsalubridadeCalculator {
  constructor(salarioBase, grauInsalubridade) {
    if (salarioBase < 0 || !['10', '20', '40'].includes(grauInsalubridade)) {
      throw new Error('Valores inválidos.');
    }

    this.salarioBase = salarioBase;
    this.grauInsalubridade = grauInsalubridade;
  }

  calcularInsalubridade() {
    const percentuais = {
      10: 0.1,
      20: 0.2,
      40: 0.4,
    };
    const percentual = percentuais[this.grauInsalubridade];
    const valorInsalubridade = this.salarioBase * percentual;

    const resultado = {
      'Salário Base': this.salarioBase,
      'Grau de Insalubridade': this.grauInsalubridade,
      'Valor do Adicional de Insalubridade': valorInsalubridade,
    };

    const valorAReceber = {
      'Valor a receber': this.salarioBase + valorInsalubridade,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}

export default InsalubridadeCalculator;
