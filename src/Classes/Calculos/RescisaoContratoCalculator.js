import { differenceInCalendarMonths, differenceInDays } from 'date-fns';
import DecimoTerceiroCalculator from './DecimoTerceiroCalculator';
import { FeriasIndenizatoriasCalculator } from './FeriasCalculator';

class RescisaoContratoCalculator {
  constructor(inicioContrato, fimContrato, remuneracaoUltima, descontos, depositoFGTS) {
    if (!inicioContrato || !fimContrato || remuneracaoUltima < 0 || descontos < 0) {
      throw new Error('Entradas inválidas.');
    }

    this.inicioContrato = this.createDateFromYYYYMMDD(inicioContrato);
    this.fimContrato = this.createDateFromYYYYMMDD(fimContrato);
    this.remuneracaoUltima = parseFloat(remuneracaoUltima);
    this.descontos = parseFloat(descontos);
    this.depositoFGTS = parseFloat(depositoFGTS);
    this.somaTotal = 0;
  }

  createDateFromYYYYMMDD(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  calcularAvisoPrevioIndenizado() {
    const diffMonths = differenceInCalendarMonths(this.fimContrato, this.inicioContrato) + 1;
    let avisoPrevioDias = 30;

    if (diffMonths > 12) {
      const anosExcedentes = Math.floor((diffMonths - 12) / 12);
      avisoPrevioDias += anosExcedentes * 3;
    }

    const valorAvisoPrevio = (this.remuneracaoUltima / 30) * avisoPrevioDias;
    this.somaTotal += valorAvisoPrevio;

    return {
      'Aviso Prévio Indenizado (dias)': avisoPrevioDias,
      'Valor do Aviso Prévio Indenizado': valorAvisoPrevio,
    };
  }

  calcularSaldoSalario() {
    const primeiroDiaMesFimContrato = new Date(this.fimContrato);
    primeiroDiaMesFimContrato.setDate(1); // Define a data para o primeiro dia do mês de fim de contrato
    const diasTrabalhadosUltimoMes =
      differenceInDays(this.fimContrato, primeiroDiaMesFimContrato) + 1;

    const valorSaldoSalario = (this.remuneracaoUltima / 30) * diasTrabalhadosUltimoMes;
    this.somaTotal += valorSaldoSalario;

    return {
      'Dias Trabalhados do Último Mês': diasTrabalhadosUltimoMes,
      'Valor do Saldo de Salário': valorSaldoSalario,
    };
  }

  calcularMultaFGTS() {
    const valorMultaFGTS = this.depositoFGTS * 0.4;
    this.somaTotal += valorMultaFGTS;

    return {
      'Valor da Multa do FGTS (40%)': valorMultaFGTS,
    };
  }

  calcularRescisao() {
    const resultados = [];

    resultados.push({
      ...this.calcularAvisoPrevioIndenizado(),
    });

    resultados.push({
      ...this.calcularSaldoSalario(),
    });

    resultados.push({
      ...this.calcularMultaFGTS(),
    });

    // Calcula a data de início do período para o Décimo Terceiro
    const primeiroDiaAnoFimContrato = new Date(this.fimContrato.getFullYear(), 0, 1);
    const formattedInicioAno = primeiroDiaAnoFimContrato.toISOString().slice(0, 10); // Formata como YYYY-MM-DD

    const formattedInicio = this.inicioContrato.toISOString().slice(0, 10); // Formata como YYYY-MM-DD
    const formattedFim = this.fimContrato.toISOString().slice(0, 10); // Formata como YYYY-MM-DD

    const decimoTerceiroCalculator = new DecimoTerceiroCalculator(
      formattedInicioAno, // Data de início formatada
      formattedFim, // Data de fim formatada
      this.remuneracaoUltima,
      0,
    );
    const decimoTerceiroResult = decimoTerceiroCalculator.calcularDecimoTerceiro();
    resultados.push({
      'Décimo Terceiro Proporcional': decimoTerceiroResult,
    });

    const baseFeriasCalculator = new FeriasIndenizatoriasCalculator(
      formattedInicio,
      formattedFim,
      this.remuneracaoUltima,
      0,
    );
    const feriasResult = baseFeriasCalculator.calcular();
    resultados.push({
      'Férias Proporcionais': feriasResult,
    });

    resultados.push({
      Descontos: this.descontos,
    });

    resultados.push({
      'Valor a Receber': this.somaTotal - this.descontos,
    });

    return resultados;
  }
}

export default RescisaoContratoCalculator;
