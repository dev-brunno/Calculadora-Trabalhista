class PericulosidadeCalculator {
  constructor(salarioBase) {
    if (salarioBase < 0) {
      throw new Error('Salário base inválido.');
    }

    this.salarioBase = salarioBase;
  }

  calcularPericulosidade() {
    const percentual = 0.3; // 30%
    const valorPericulosidade = this.salarioBase * percentual;
    return valorPericulosidade;
  }
}

export default PericulosidadeCalculator;
