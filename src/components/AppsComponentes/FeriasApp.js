import React, { useState } from 'react';
import CalculationForm from '../CalculationForm'; // Importe o componente CalculationForm
import CalculationResult from '../CalculationResult';
import { FeriasIndenizatoriasCalculator } from '../../Calculos/FeriasCalculator';

function FeriasApp() {
  const [inicioContrato, setInicioContrato] = useState('2022-01-01');
  const [fimContrato, setFimContrato] = useState('2024-09-30');
  const [remuneracao, setRemuneracao] = useState(1200);
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
      const calculator = new FeriasIndenizatoriasCalculator(
        inicioContrato,
        fimContrato,
        remuneracao,
      );
      const calculatedResults = await calculator.calcular();
      setResultados(calculatedResults);
    } catch (error) {
      setErroCalculo('Erro ao calcular férias. Verifique os valores e tente novamente.');
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
      id: 'remuneracao',
      label: 'Remuneração da Última Férias',
      type: 'number',
      value: remuneracao,
      setter: setRemuneracao,
    },
  ];

  const renderFeriasResult = (result) => (
    <div>
      <strong>Período:</strong> {result.periodo}
      <br />
      <strong>Férias:</strong> R${' '}
      {result.ferias.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}
      <br />
      <strong>Terço Constitucional:</strong> R${' '}
      {result.tercoConstitucional.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}
      <br />
      {result.feriasIndenizatorias !== undefined && (
        <div>
          <strong>Férias Indenizatórias:</strong> R${' '}
          {result.feriasIndenizatorias.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
          <br />
        </div>
      )}
      {result.feriasProporcionais !== undefined && (
        <div>
          <strong>Férias Proporcionais:</strong> R${' '}
          {result.feriasProporcionais.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
          <br />
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1>Calculadora de Férias</h1>
      <CalculationForm
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleCalculate={handleCalculate}
        calculando={calculando}
      />
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
      {resultados.length > 0 && (
        <CalculationResult
          title='Resultados de Férias'
          results={resultados}
          renderResult={renderFeriasResult}
        />
      )}
    </div>
  );
}

export default FeriasApp;
