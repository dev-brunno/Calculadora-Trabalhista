import BaseCalculator from './baseCalculator';
import { AdicionalInsalubridade, AdicionalPericulosidade, OutrosAdicionais } from './adicionalCalc';

export class CalcDesTerceiro extends BaseCalculator {
  constructor({
    salarioBruto,
    mesesTrabalhados,
    adicionais,
    grauExposicao = null,
    outrosAdicionais = null,
  }) {
    super(salarioBruto, mesesTrabalhados);
    this.adicionais = adicionais;
    this.grauExposicao = grauExposicao;
    this.outrosAdicionais = outrosAdicionais;
  }

  calcularValorTotal() {
    let valorTotalAdicionais = 0;

    for (const adicional of this.adicionais) {
      if (adicional.valor) {
        switch (adicional.nome) {
          case 'Periculosidade': {
            const adicionalPericulosidade = new AdicionalPericulosidade(
              this.salarioBruto,
              this.mesTrabalhados,
            );
            valorTotalAdicionais += adicionalPericulosidade.calculaValor();
            break;
          }

          case 'Insalubridade': {
            const adicionalInsalubridade = new AdicionalInsalubridade(
              this.salarioBruto,
              this.mesTrabalhados,
              this.grauExposicao,
            );
            valorTotalAdicionais += adicionalInsalubridade.calculaValor();
            break;
          }

          case 'Extra':
            if (this.outrosAdicionais !== null) {
              const adicionaisExtras = new OutrosAdicionais(
                this.salarioBruto,
                this.mesTrabalhados,
                this.outrosAdicionais,
              );
              valorTotalAdicionais += adicionaisExtras.calculaValor();
            }
            break;

          default:
            break;
        }
      }
    }

    const valorTotal = this.salarioBase * this.mesTrabalhados + valorTotalAdicionais;

    return valorTotal;
  }
}
