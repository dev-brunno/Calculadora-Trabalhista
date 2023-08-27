import React, { useState } from 'react';
import CalculationForm from '../CalculationForm'; // Importe o componente CalculationForm
import CalculationResult from '../CalculationResult';
import FGTSCalculator from '../../Calculos/FGTSCalculator';

function FGTSApp() {
  const [salarioMensal, setSalarioMensal] = useState(3000);
  const [valorFGTS, setValorFGTS] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);

  const handleInputChange = (event, setter) => {
    setValorFGTS(null); // Limpa os resultados ao alterar campos
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const fgtsCalculator = new FGTSCalculator(salarioMensal);
      const calculatedFGTS = fgtsCalculator.calcularFGTS();
      setValorFGTS(calculatedFGTS);
    } catch (error) {
      setErroCalculo('Erro ao calcular o FGTS. Verifique o valor e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const inputs = [
    {
      id: 'salarioMensal',
      label: 'Salário Mensal',
      type: 'number',
      value: salarioMensal,
      setter: setSalarioMensal,
    },
  ];

  const renderFGTSResult = (result) => (
    <div>
      <h2>Resultado do FGTS</h2>
      <p>
        O valor do FGTS calculado é R${' '}
        {result.valorFGTS.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );

  return (
    <div>
      <h1>Calculadora de FGTS</h1>
      <CalculationForm
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleCalculate={handleCalculate}
        calculando={calculando}
      />
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
      {valorFGTS !== null && (
        <CalculationResult
          title='Resultado do FGTS'
          results={[{ valorFGTS }]}
          renderResult={renderFGTSResult}
        />
      )}
    </div>
  );
}

export default FGTSApp;
