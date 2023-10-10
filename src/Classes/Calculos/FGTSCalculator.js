import { differenceInDays } from 'date-fns';

export default class FGTSCalculator {
  constructor(periodoInicial, periodoFinal, salarioMensal) {
    if (salarioMensal < 0) {
      throw new Error('Salário mensal inválido.');
    }

    this.periodoInicial = this.createDateFromYYYYMMDD(periodoInicial);
    this.periodoFinal = this.createDateFromYYYYMMDD(periodoFinal);
    this.salarioMensal = parseFloat(salarioMensal);
  }

  createDateFromYYYYMMDD(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  calcularFGTS() {
    const taxaFGTS = 0.08; // Taxa de 8%

    let valorTotalFGTS = 0;

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
      let valorFGTS = 0;

      if (diasNoMes === diasTrabalhadosNoMes) {
        valorFGTS = this.salarioMensal * taxaFGTS;
      } else {
        valorFGTS = (this.salarioMensal / 30) * diasTrabalhadosNoMes * taxaFGTS;
      }

      valorTotalFGTS += valorFGTS;

      currentDate.setMonth(currentDate.getMonth() + 1); // Avança para o próximo mês
      currentDate.setDate(1); // Define o dia como 1
    }

    const periodo = `${this.periodoInicial.toLocaleDateString()} a ${this.periodoFinal.toLocaleDateString()}`;

    const resultado = {
      Período: periodo,
      'Salário Mensal': this.salarioMensal,
      'Valor do FGTS': valorTotalFGTS,
    };

    const valorAReceber = {
      'Valor a Receber': valorTotalFGTS,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}
