import { differenceInDays } from 'date-fns';

class TransferenciaCalculator {
  constructor(periodoInicial, periodoFinal, salarioMensal, porcentagem) {
    if (salarioMensal < 0 || porcentagem < 0) {
      throw new Error('Valores inválidos.');
    }

    this.periodoInicial = this.createDateFromYYYYMMDD(periodoInicial);
    this.periodoFinal = this.createDateFromYYYYMMDD(periodoFinal);
    this.salarioMensal = parseFloat(salarioMensal);
    this.porcentagem = parseFloat(porcentagem);
  }

  createDateFromYYYYMMDD(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  calcularTransferencia() {
    let valorTotalTransferencia = 0;

    const currentDate = new Date(this.periodoInicial);

    while (currentDate <= this.periodoFinal) {
      const monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const diasNoMes = monthEndDate.getDate(); // Total de dias no mês

      let diasTrabalhadosNoMes = 0;

      if (this.periodoFinal <= monthEndDate) {
        diasTrabalhadosNoMes = differenceInDays(this.periodoFinal, currentDate) + 1;
      } else {
        diasTrabalhadosNoMes = differenceInDays(monthEndDate, currentDate) + 1;
      }

      let valorTransferencia = 0;

      if (diasNoMes === diasTrabalhadosNoMes) {
        valorTransferencia = this.salarioMensal * (this.porcentagem / 100);
      } else {
        valorTransferencia =
          (this.salarioMensal / 30) * diasTrabalhadosNoMes * (this.porcentagem / 100);
      }

      valorTotalTransferencia += valorTransferencia;

      currentDate.setMonth(currentDate.getMonth() + 1); // Avança para o próximo mês
      currentDate.setDate(1); // Define o dia como 1
    }

    const periodo = `${this.periodoInicial.toLocaleDateString()} a ${this.periodoFinal.toLocaleDateString()}`;

    const resultado = {
      Período: periodo,
      Remuneração: this.salarioMensal,
      Porcentagem: `${this.porcentagem}%`,
      'Valor da Transferência': valorTotalTransferencia,
    };

    const valorAReceber = {
      'Valor a Receber': valorTotalTransferencia,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}

export default TransferenciaCalculator;
