import { calcularValorHoraTrabalho } from '../Funcoes/genericFunctions';

class NoturnoCalculator {
  constructor(horasTrabalhadasSem, remuneracao, tipoEmpregado, horasTrabalhadasNortuna) {
    if (horasTrabalhadasSem < 0 || remuneracao < 0 || !['20', '25'].includes(tipoEmpregado)) {
      throw new Error('Valores inválidos.');
    }

    this.horasTrabalhadasSem = parseFloat(horasTrabalhadasSem);
    this.remuneracao = parseFloat(remuneracao);
    this.ValorHoraTrabalho = calcularValorHoraTrabalho(this.horasTrabalhadasSem, this.remuneracao);
    this.tipoEmpregado = tipoEmpregado;
    this.horasTrabalhadasNortuna = parseFloat(horasTrabalhadasNortuna);
  }

  calcularNoturno() {
    const tipoEmpregadoText = {
      20: 'Empregado Urbano (20%)',
      25: 'Empregado Rural (25%)',
    };

    const percentuais = {
      20: 0.2,
      25: 0.25,
    };

    const percentual = percentuais[this.tipoEmpregado];

    const adicional = this.ValorHoraTrabalho * percentual;
    const valorHoraNoturna = this.ValorHoraTrabalho + adicional;
    const valorAdicionalNoturno = valorHoraNoturna * this.horasTrabalhadasNortuna;

    const resultado = {
      'Última Remuneração': this.remuneracao,
      'Tipo de Empregado': tipoEmpregadoText[this.tipoEmpregado],
      'Horas Noturnas Trabalhadas': `${this.horasTrabalhadasNortuna} Horas`,
      'Valor do Adicional Noturno': valorAdicionalNoturno,
    };

    const valorAReceber = {
      'Valor a Receber': valorAdicionalNoturno,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}

export default NoturnoCalculator;
