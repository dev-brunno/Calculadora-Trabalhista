import { differenceInCalendarMonths, differenceInDays } from 'date-fns';

// Classe para calcular o Décimo Terceiro
export default class DecimoTerceiroCalculator {
  constructor(inicioContrato, fimContrato, remuneracaoUltima, descontos) {
    if (!inicioContrato || !fimContrato || remuneracaoUltima < 0 || descontos < 0) {
      throw new Error('Entradas inválidas.');
    }

    this.inicioContrato = this.createDateFromYYYYMMDD(inicioContrato);
    this.fimContrato = this.createDateFromYYYYMMDD(fimContrato);
    this.remuneracaoUltima = parseFloat(remuneracaoUltima);
    this.descontos = parseFloat(descontos);
  }

  createDateFromYYYYMMDD(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // O mês em JavaScript é baseado em zero (janeiro = 0, fevereiro = 1, ...)
  }

  // Calcula o Décimo Terceiro
  calcularDecimoTerceiro() {
    const resultado = [];
    let somaTotal = 0;

    let dataInicio = new Date(this.inicioContrato);
    let anoCorrespondente = dataInicio.getFullYear();

    while (dataInicio <= this.fimContrato) {
      let dataFimAno = new Date(anoCorrespondente, 11, 31);
      if (dataFimAno > this.fimContrato) {
        dataFimAno = this.fimContrato;
      }

      const periodo = `${dataInicio.toLocaleDateString()} a ${dataFimAno.toLocaleDateString()}`;
      const mesesTrabalhados = this.calcularMesesTrabalhados(dataInicio, dataFimAno);
      const avos = this.remuneracaoUltima / 12;
      const valorDecimoTerceiro = avos * mesesTrabalhados;

      somaTotal += valorDecimoTerceiro;

      resultado.push({
        Período: periodo,
        'Ano correspondente': anoCorrespondente.toString(),
        'Última Remuneração': this.remuneracaoUltima,
        'Valor do Decimo Terceiro': valorDecimoTerceiro,
      });

      anoCorrespondente++;
      dataInicio.setFullYear(anoCorrespondente, 0, 1);

      if (dataInicio > this.fimContrato) {
        break;
      }
    }

    resultado.push({
      Descontos: this.descontos,
      'Valor a Receber': somaTotal - this.descontos,
    });

    return resultado;
  }

  // Calcula os meses trabalhados
  calcularMesesTrabalhados(dataInicio, dataFim) {
    // Calcula a diferença em meses completos entre dataFim e dataInicio
    const diffMonths = differenceInCalendarMonths(dataFim, dataInicio) + 1;

    // Calcula o número de dias no primeiro mês completo
    const daysInFirstMonth =
      differenceInDays(
        new Date(dataInicio.getFullYear(), dataInicio.getMonth() + 1, 0),
        dataInicio,
      ) + 1;

    // Obtém o número de dias no último mês completo
    const daysInLastMonth = dataFim.getDate();

    // Verifica se o primeiro mês completo tem pelo menos 15 dias
    // Se sim, verifica se o último mês completo tem pelo menos 15 dias
    // Com base nas verificações, ajusta o número total de meses trabalhados
    const adjustedDiffMonths =
      daysInFirstMonth >= 15
        ? daysInLastMonth >= 15
          ? diffMonths
          : diffMonths - 1
        : diffMonths - 1;

    // Retorna o número de meses ajustados considerando os dias mínimos
    return adjustedDiffMonths;
  }
}
