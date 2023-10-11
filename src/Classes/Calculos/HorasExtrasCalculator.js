import { calcularValorHoraTrabalho } from '../Funcoes/genericFunctions';

class HorasExtrasCalculator {
  constructor(horasTrabalhadasSem, remuneracao, tipoDia, horasExtrasFeitas) {
    if (horasTrabalhadasSem < 0 || remuneracao < 0 || !['50', '100'].includes(tipoDia)) {
      throw new Error('Valores inválidos.');
    }

    this.horasTrabalhadasSem = parseFloat(horasTrabalhadasSem);
    this.remuneracao = parseFloat(remuneracao);
    this.ValorHoraTrabalho = calcularValorHoraTrabalho(this.horasTrabalhadasSem, this.remuneracao);
    this.tipoDia = tipoDia;
    this.horasExtrasFeitas = parseFloat(horasExtrasFeitas);
  }

  calcular() {
    const tipoDiaText = {
      50: 'Dias úteis (50%)',
      100: 'Domingos e Feriados (100%)',
    };

    const percentuais = {
      50: 0.5,
      100: 1,
    };

    const percentual = percentuais[this.tipoDia];

    const adicional = this.ValorHoraTrabalho * percentual;
    const valorHoraExtra = this.ValorHoraTrabalho + adicional;
    const valorTotalHorasExtra = valorHoraExtra * this.horasExtrasFeitas;

    const resultado = {
      'Última Remuneração': this.remuneracao,
      'Tipo de Dia': tipoDiaText[this.tipoDia],
      'Horas Extras Trabalhadas': `${this.horasExtrasFeitas} Horas`,
      'Valor das Horas Extras': valorTotalHorasExtra,
    };

    const valorAReceber = {
      'Valor a Receber': valorTotalHorasExtra,
    };

    const resultados = [resultado, valorAReceber];

    return resultados;
  }
}

export default HorasExtrasCalculator;
