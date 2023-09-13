import { differenceInCalendarMonths, differenceInDays } from 'date-fns';

// Classe para calcular o Décimo Terceiro
export default class DecimoTerceiroCalculator {
  constructor(inicioContrato, fimContrato, remuneracaoUltima) {
    if (!inicioContrato || !fimContrato || remuneracaoUltima < 0) {
      throw new Error('Entradas inválidas.');
    }

    this.inicioContrato = this.createDateFromYYYYMMDD(inicioContrato);
    this.fimContrato = this.createDateFromYYYYMMDD(fimContrato);
    this.remuneracaoUltima = remuneracaoUltima;
  }

  createDateFromYYYYMMDD(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // O mês em JavaScript é baseado em zero (janeiro = 0, fevereiro = 1, ...)
  }

  // Calcula o Décimo Terceiro
  calcularDecimoTerceiro() {
    const resultados = [];

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

      resultados.push({
        valorDecimoTerceiro: valorDecimoTerceiro,
        periodo: periodo,
        anoCorrespondente: anoCorrespondente,
      });

      anoCorrespondente++;
      dataInicio.setFullYear(anoCorrespondente, 0, 1);

      if (dataInicio > this.fimContrato) {
        break;
      }
    }

    return resultados;
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