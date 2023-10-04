class PericulosidadeCalculator {
  constructor(salarioBase) {
    if (salarioBase < 0) {
      throw new Error('Salário base inválido.');
    }

    this.salarioBase = parseFloat(salarioBase);
  }

  calcularPericulosidade() {
    const percentual = 0.3; // 30%
    const valorPericulosidade = this.salarioBase * percentual;

    const resultado = {
      'Salário Base': this.salarioBase,
      'Valor do adicional de periculosidade': valorPericulosidade,
    };

    const valorAReceber = {
      'Valor a Receber': valorPericulosidade + this.salarioBase,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}

export default PericulosidadeCalculator;
