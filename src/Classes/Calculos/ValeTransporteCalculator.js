import { differenceInDays } from 'date-fns';

export default class ValeTransporteCalculator {
  constructor(periodoInicial, periodoFinal, remuneracao) {
    if (remuneracao < 0) {
      throw new Error('Salário mensal inválido.');
    }

    this.periodoInicial = this.createDateFromYYYYMMDD(periodoInicial);
    this.periodoFinal = this.createDateFromYYYYMMDD(periodoFinal);
    this.remuneracao = parseFloat(remuneracao);
  }

  createDateFromYYYYMMDD(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  calcular() {
    const porcentagem = 0.06; // Taxa de 6% do vale transporte

    let valorTotalValeTransporte = 0;

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
      let valorValeTransporte = 0;

      if (diasNoMes === diasTrabalhadosNoMes) {
        valorValeTransporte = this.remuneracao * porcentagem;
      } else {
        valorValeTransporte = (this.remuneracao / 30) * diasTrabalhadosNoMes * porcentagem;
      }

      valorTotalValeTransporte += valorValeTransporte;

      currentDate.setMonth(currentDate.getMonth() + 1); // Avança para o próximo mês
      currentDate.setDate(1); // Define o dia como 1
    }

    const periodo = `${this.periodoInicial.toLocaleDateString()} a ${this.periodoFinal.toLocaleDateString()}`;

    const resultado = {
      Período: periodo,
      Remuneração: this.remuneracao,
      'Valor do Vale Transporte': valorTotalValeTransporte,
    };

    const valorAReceber = {
      'Valor a Receber': valorTotalValeTransporte,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}
