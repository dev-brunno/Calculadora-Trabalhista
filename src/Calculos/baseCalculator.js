export default class BaseCalculator {
  constructor(salarioBruto, mesTrabalhados) {
    this.salarioBruto = salarioBruto;
    this.mesTrabalhados = mesTrabalhados;
    this.salarioBase = salarioBruto / 12;
  }
}
