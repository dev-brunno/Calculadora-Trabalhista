import React, { useState } from 'react';
import CalculationForm from '../CalculationForm'; // Importe o componente CalculationForm
import CalculationResult from '../CalculationResult';
import TransferenciaCalculator from '../../Calculos/TransferenciaCalculator';

function TransferenciaApp() {
  const [remuneracao, setRemuneracao] = useState(2000);
  const [porcentagem, setPorcentagem] = useState(10);
  const [valorTransferencia, setValorTransferencia] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null); // Estado para tratar erros

  const handleInputChange = (event, setter) => {
    setValorTransferencia(null); // Limpa os resultados ao alterar campos
    setter(event.target.value);
  };

  const handleCalculate = () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const transferenciaCalculator = new TransferenciaCalculator(remuneracao, porcentagem);
      const calculatedTransferencia = transferenciaCalculator.calcularTransferencia();
      setValorTransferencia(calculatedTransferencia);
    } catch (error) {
      console.error('Erro ao calcular transferência:', error);
      setErroCalculo('Erro ao calcular transferência. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
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

  const renderTransferenciaResult = (result) => (
    <div>
      <h2>Resultado de Transferência</h2>
      <p>
        O valor da transferência calculado é R${' '}
        {result.valorTransferencia.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );

  return (
    <div>
      <h1>Calculadora de Transferência</h1>
      <CalculationForm
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleCalculate={handleCalculate}
        calculando={calculando}
      />
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
      {valorTransferencia !== null && (
        <CalculationResult
          title='Resultado de Transferência'
          results={[{ valorTransferencia }]}
          renderResult={renderTransferenciaResult}
        />
      )}
    </div>
  );
}

export default TransferenciaApp;
