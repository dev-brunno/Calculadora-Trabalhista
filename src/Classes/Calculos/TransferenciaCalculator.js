class TransferenciaCalculator {
  constructor(remuneracao, porcentagem) {
    if (remuneracao < 0 || porcentagem < 0) {
      throw new Error('Valores inválidos.');
    }

    this.remuneracao = remuneracao;
    this.porcentagem = porcentagem;
  }

  calcularTransferencia() {
    const valorTransferencia = this.remuneracao * (this.porcentagem / 100);

    const resultados = {
      Remuneração: this.remuneracao,
      Porcentagem: this.porcentagem,
      'Valor da Transferência': valorTransferencia,
    };
    return resultados;
  }
}

export default TransferenciaCalculator;
