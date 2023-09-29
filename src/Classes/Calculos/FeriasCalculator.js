import { differenceInCalendarMonths, differenceInDays } from 'date-fns';

class BaseFeriasCalculator {
  constructor(inicioContrato, fimContrato, remuneracaoUltima, descontos) {
    if (!inicioContrato || !fimContrato || remuneracaoUltima < 0 || descontos < 0) {
      throw new Error('Entradas inválidas.');
    }

    this.inicioContrato = this.createDateFromYYYYMMDD(inicioContrato);
    this.fimContrato = this.createDateFromYYYYMMDD(fimContrato);
    this.remuneracaoUltima = parseFloat(remuneracaoUltima);
    this.descontos = parseFloat(descontos);
    console.log(descontos);
    this.somaTotal = 0;
  }

  createDateFromYYYYMMDD(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  calcularMesesTrabalhados(dataInicio, dataFim) {
    const diffMonths = differenceInCalendarMonths(dataFim, dataInicio) + 1;
    const daysInFirstMonth =
      differenceInDays(
        new Date(dataInicio.getFullYear(), dataInicio.getMonth() + 1, 0),
        dataInicio,
      ) + 1;
    const daysInLastMonth = dataFim.getDate();
    const adjustedDiffMonths =
      daysInFirstMonth >= 15
        ? daysInLastMonth >= 15
          ? diffMonths
          : diffMonths - 1
        : diffMonths - 1;
    return adjustedDiffMonths;
  }

  getFormattedDate(date) {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  calcularFeriasProporcionais(periodoInicial, dataFimPeriodo) {
    const mesesTrabalhados = this.calcularMesesTrabalhados(periodoInicial, dataFimPeriodo);

    if (mesesTrabalhados > 0) {
      const avos = this.remuneracaoUltima / 12;
      const ferias = avos * mesesTrabalhados;
      const tercoConstitucional = ferias / 3;
      const feriasProporcionais = ferias + tercoConstitucional;
      // Adicione o valor de feriasProporcionais a somaTotal
      this.somaTotal += feriasProporcionais;

      return {
        'Última remuneração': this.remuneracaoUltima,
        'Valor das ferias': ferias,
        'Terço Constitucional': tercoConstitucional,
        'Férias Proporcionais': feriasProporcionais,
      };
    } else {
      return null; // Retorna nulo para períodos menores que 12 meses
    }
  }

  calcular() {
    const resultados = [];

    const periodoInicial = new Date(this.inicioContrato);
    const periodoFinal = new Date(this.fimContrato);

    while (periodoInicial <= periodoFinal) {
      const dataFimPeriodo = new Date(periodoInicial);
      dataFimPeriodo.setFullYear(periodoInicial.getFullYear() + 1);

      if (dataFimPeriodo > periodoFinal) {
        dataFimPeriodo.setDate(periodoFinal.getDate());
        dataFimPeriodo.setMonth(periodoFinal.getMonth());
        dataFimPeriodo.setFullYear(periodoFinal.getFullYear());
      }

      if (this.calcularMesesTrabalhados(periodoInicial, dataFimPeriodo) >= 12) {
        const periodo = `${periodoInicial.toLocaleDateString()} a ${dataFimPeriodo.toLocaleDateString()}`;
        const calculo = this.calcularFeriasIndenizatorias(periodoInicial, dataFimPeriodo);
        resultados.push({ Período: periodo, ...calculo });
      } else {
        const calculo = this.calcularFeriasProporcionais(periodoInicial, dataFimPeriodo); // Chama aqui sem especificar período
        if (calculo) {
          const periodo = `${periodoInicial.toLocaleDateString()} a ${dataFimPeriodo.toLocaleDateString()}`;
          resultados.push({ Período: periodo, ...calculo });
        }
      }

      periodoInicial.setFullYear(periodoInicial.getFullYear() + 1);
    }

    resultados.push({
      Descontos: this.descontos,
      'Valor a Receber': this.somaTotal - this.descontos, // Adiciona somaTotal aos resultados finais
    });

    return resultados;
  }
}

export class FeriasIndenizatoriasCalculator extends BaseFeriasCalculator {
  calcularFeriasIndenizatorias(dataInicioPeriodo, dataFimPeriodo) {
    const diffMonths = differenceInCalendarMonths(dataFimPeriodo, dataInicioPeriodo);

    if (diffMonths >= 12) {
      const avos = this.remuneracaoUltima / 12;
      const mesesTrabalhados = this.calcularMesesTrabalhados(dataInicioPeriodo, dataFimPeriodo);
      const ferias = avos * mesesTrabalhados;
      const tercoConstitucional = ferias / 3;
      const feriasIndenizatorias = ferias + tercoConstitucional;
      this.somaTotal += feriasIndenizatorias;

      const resultados = {
        'Última Remuneração': this.remuneracaoUltima,
        Férias: ferias,
        'Terço Constitucional': tercoConstitucional,
        'Férias Indenizatorias': feriasIndenizatorias,
      };

      return resultados;
    } else {
      return null; // Retorna nulo para períodos menores que 12 meses
    }
  }
}
