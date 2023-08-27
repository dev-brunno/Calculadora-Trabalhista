import React, { useState } from 'react';
import CalculationForm from '../CalculationForm'; // Importe o componente
import CalculationResult from '../CalculationResult';
import DecimoTerceiroCalculator from '../../Calculos/DecimoTerceiroCalculator';

function DecimoTerceiroApp() {
  const [inicioContrato, setInicioContrato] = useState('2022-01-01');
  const [fimContrato, setFimContrato] = useState('2026-03-15');
  const [remuneracaoUltima, setRemuneracaoUltima] = useState(5000);
  const [resultados, setResultados] = useState([]);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);

  const handleInputChange = (event, setter) => {
    setResultados([]); // Limpa os resultados ao alterar campos
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const calculator = new DecimoTerceiroCalculator(
        inicioContrato,
        fimContrato,
        remuneracaoUltima,
      );
      const resultadosCalculados = await calculator.calcularDecimoTerceiro();
      setResultados(resultadosCalculados);
    } catch (error) {
      setErroCalculo('Erro ao calcular o décimo terceiro. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const inputs = [
    {
      id: 'inicioContrato',
      label: 'Data de Início do Contrato',
      type: 'date',
      value: inicioContrato,
      setter: setInicioContrato,
    },
    {
      id: 'fimContrato',
      label: 'Data de Término do Contrato',
      type: 'date',
      value: fimContrato,
      setter: setFimContrato,
    },
    {
      id: 'remuneracaoUltima',
      label: 'Remuneração da Última Parcela',
      type: 'number',
      value: remuneracaoUltima,
      setter: setRemuneracaoUltima,
    },
  ];

  const renderDecimoTerceiroResult = (result) => (
    <div>
      <strong>Ano Correspondente:</strong> {result.anoCorrespondente}
      <br />
      <strong>Período:</strong> {result.periodo}
      <br />
      <strong>Valor do Décimo Terceiro:</strong> R${' '}
      {result.valorDecimoTerceiro.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}
    </div>
  );

  return (
    <div>
      <h1>Calculadora de Décimo Terceiro</h1>
      <CalculationForm
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleCalculate={handleCalculate}
        calculando={calculando}
      />
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
      {resultados.length > 0 && (
        <CalculationResult
          title='Resultados do Décimo Terceiro'
          results={resultados}
          renderResult={renderDecimoTerceiroResult}
        />
      )}
    </div>
  );
}

export default DecimoTerceiroApp;
