import { differenceInDays } from 'date-fns';

class PericulosidadeCalculator {
  constructor(periodoInicial, periodoFinal, salarioMensal) {
    if (salarioMensal < 0) {
      throw new Error('Salário base inválido.');
    }

    this.periodoInicial = this.createDateFromYYYYMMDD(periodoInicial);
    this.periodoFinal = this.createDateFromYYYYMMDD(periodoFinal);
    this.salarioMensal = parseFloat(salarioMensal);
  }

  createDateFromYYYYMMDD(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  calcularPericulosidade() {
    const percentual = 0.3; // 30%

    let valorTotalPericulosidade = 0;

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

      let valorPericulosidade = 0;

      if (diasNoMes === diasTrabalhadosNoMes) {
        valorPericulosidade = this.salarioMensal * percentual;
      } else {
        valorPericulosidade = (this.salarioMensal / 30) * diasTrabalhadosNoMes * percentual;
      }

      valorTotalPericulosidade += valorPericulosidade;

      currentDate.setMonth(currentDate.getMonth() + 1); // Avança para o próximo mês
      currentDate.setDate(1); // Define o dia como 1
    }

    const periodo = `${this.periodoInicial.toLocaleDateString()} a ${this.periodoFinal.toLocaleDateString()}`;

    const resultado = {
      Período: periodo,
      'Salário Mensal': this.salarioMensal,
      'Valor do adicional de periculosidade': valorTotalPericulosidade,
    };

    const valorAReceber = {
      'Valor a Receber': valorTotalPericulosidade,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}

export default PericulosidadeCalculator;
