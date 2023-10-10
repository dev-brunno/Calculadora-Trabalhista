import { differenceInDays } from 'date-fns';

class InsalubridadeCalculator {
  constructor(periodoInicial, periodoFinal, salarioMensal, grauInsalubridade) {
    if (salarioMensal < 0 || !['10', '20', '40'].includes(grauInsalubridade)) {
      throw new Error('Valores inválidos.');
    }

    this.periodoInicial = this.createDateFromYYYYMMDD(periodoInicial);
    this.periodoFinal = this.createDateFromYYYYMMDD(periodoFinal);
    this.salarioMensal = parseFloat(salarioMensal);
    this.grauInsalubridade = grauInsalubridade;
  }

  createDateFromYYYYMMDD(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
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

    let valorTotalInsalubridade = 0;

    const currentDate = new Date(this.periodoInicial);

    while (currentDate <= this.periodoFinal) {
      const percentual = percentuais[this.grauInsalubridade];

      const monthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const diasNoMes = monthEndDate.getDate(); // Total de dias no mês

      let diasTrabalhadosNoMes = 0;

      if (this.periodoFinal <= monthEndDate) {
        diasTrabalhadosNoMes = differenceInDays(this.periodoFinal, currentDate) + 1;
      } else {
        diasTrabalhadosNoMes = differenceInDays(monthEndDate, currentDate) + 1;
      }

      let valorInsalubridade = 0;

      if (diasNoMes === diasTrabalhadosNoMes) {
        valorInsalubridade = this.salarioMensal * percentual;
      } else {
        valorInsalubridade = (this.salarioMensal / 30) * diasTrabalhadosNoMes * percentual;
      }

      valorTotalInsalubridade += valorInsalubridade;

      currentDate.setMonth(currentDate.getMonth() + 1); // Avança para o próximo mês
      currentDate.setDate(1); // Define o dia como 1
    }

    const periodo = `${this.periodoInicial.toLocaleDateString()} a ${this.periodoFinal.toLocaleDateString()}`;

    const resultado = {
      Período: periodo,
      'Salário Mensal': this.salarioMensal,
      'Grau de Insalubridade': grauInsalubridadeText[this.grauInsalubridade],
      'Valor do Adicional de Insalubridade': valorTotalInsalubridade,
    };

    const valorAReceber = {
      'Valor a Receber': valorTotalInsalubridade,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}

export default InsalubridadeCalculator;
