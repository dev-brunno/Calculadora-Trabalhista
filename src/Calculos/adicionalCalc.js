// Importa a classe base para herança
import BaseCalculator from './baseCalculator';

// Classe para cálculo do adicional de insalubridade
export class AdicionalInsalubridade extends BaseCalculator {
  constructor(salarioBruto, mesTrabalhados, grauExposicao) {
    // Chama o construtor da classe base
    super(salarioBruto, mesTrabalhados);
    // Calcula o adicional de insalubridade com base no grau de exposição
    this.adicionalInsalubridade = this.calculaAdicional(grauExposicao);
  }

  // Calcula o adicional de insalubridade com base no grau de exposição
  calculaAdicional(grauExposicao) {
    const percentuaisAdicional = {
      mínimo: 0.1,
      médio: 0.2,
      máximo: 0.4,
    };

    const percentualAdicional = percentuaisAdicional[grauExposicao];
    return this.salarioBruto * percentualAdicional;
  }

  // Retorna o valor do adicional de insalubridade
  calculaValor() {
    return this.adicionalInsalubridade;
  }
}

// Classe para cálculo do adicional de periculosidade
export class AdicionalPericulosidade extends BaseCalculator {
  constructor(salarioBruto, mesTrabalhados) {
    // Chama o construtor da classe base
    super(salarioBruto, mesTrabalhados);
    // Calcula o adicional de periculosidade
    this.adicionalPericulosidade = this.calculaAdicional(0.3);
  }

  // Calcula o adicional de periculosidade com base em um percentual fixo
  calculaAdicional(percentual) {
    return this.salarioBruto * percentual;
  }

  // Retorna o valor do adicional de periculosidade
  calculaValor() {
    return this.adicionalPericulosidade;
  }
}

// Classe para cálculo de outros adicionais
export class OutrosAdicionais extends BaseCalculator {
  constructor(salarioBruto, mesTrabalhados, outrosAdicionais) {
    // Chama o construtor da classe base
    super(salarioBruto, mesTrabalhados);
    // Armazena o valor dos outros adicionais
    this.outrosAdicionais = outrosAdicionais;
  }

  // Retorna o valor dos outros adicionais
  calculaValor() {
    return this.outrosAdicionais;
  }
}
