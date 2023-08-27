import React, { useState } from 'react';
import CalculationForm from '../CalculationForm'; // Importe o componente CalculationForm
import CalculationResult from '../CalculationResult';
import TransferenciaCalculator from '../../Calculos/TransferenciaCalculator';

function TransferenciaApp() {
  const [remuneracao, setRemuneracao] = useState(2000);
  const [porcentagem, setPorcentagem] = useState(10);
  const [valorTransferencia, setValorTransferencia] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setValorTransferencia(null);
    setter(event.target.value);
  };

  const handleCalculate = () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const transferenciaCalculator = new TransferenciaCalculator(remuneracao, porcentagem);
      const calculatedTransferencia = transferenciaCalculator.calcularTransferencia();
      setValorTransferencia(calculatedTransferencia);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular transferência. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setValorTransferencia(null);
  };

  const inputs = [
    {
      id: 'remuneracao',
      label: 'Remuneração',
      type: 'number',
      value: remuneracao,
      setter: setRemuneracao,
      min: 0,
      step: 100,
    },
    {
      id: 'porcentagem',
      label: 'Porcentagem',
      type: 'number',
      value: porcentagem,
      setter: setPorcentagem,
      min: 0,
      step: 1,
    },
  ];

  const renderTransferenciaResult = (valor) => (
    <div>
      <strong>Valor da transferência calculado:</strong> R${' '}
      {valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}
    </div>
  );

  return (
    <div>
      <h1>Calculadora de Transferência</h1>
      {mostrarResultados ? (
        <div>
          <CalculationResult
            title='Resultado de Transferência'
            results={[valorTransferencia]}
            renderResult={renderTransferenciaResult}
          />
          <button onClick={handleRefazerCalculo}>Refazer Cálculo</button>
        </div>
      ) : (
        <CalculationForm
          inputs={inputs}
          handleInputChange={handleInputChange}
          handleCalculate={handleCalculate}
          calculando={calculando}
        />
      )}
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
    </div>
  );
}

export default TransferenciaApp;
