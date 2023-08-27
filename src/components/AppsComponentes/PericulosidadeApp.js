import React, { useState } from 'react';
import CalculationForm from '../CalculationForm'; // Importe o componente CalculationForm
import CalculationResult from '../CalculationResult';
import PericulosidadeCalculator from '../../Calculos/PericulosidadeCalculator';

function PericulosidadeApp() {
  const [salarioBase, setSalarioBase] = useState(2000);
  const [valorPericulosidade, setValorPericulosidade] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null); // Estado para tratar erros

  const handleInputChange = (event, setter) => {
    setValorPericulosidade(null); // Limpa os resultados ao alterar campos
    setter(event.target.value);
  };

  const handleCalculate = () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const periculosidadeCalculator = new PericulosidadeCalculator(salarioBase);
      const calculatedPericulosidade = periculosidadeCalculator.calcularPericulosidade();
      setValorPericulosidade(calculatedPericulosidade);
    } catch (error) {
      console.error('Erro ao calcular periculosidade:', error);
      setErroCalculo('Erro ao calcular periculosidade. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const inputs = [
    {
      id: 'salarioBase',
      label: 'Salário Base',
      type: 'number',
      value: salarioBase,
      setter: setSalarioBase,
    },
  ];

  const renderPericulosidadeResult = (result) => (
    <div>
      <p>
        O valor da periculosidade calculado é R${' '}
        {result.valorPericulosidade.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );

  return (
    <div>
      <h1>Calculadora de Periculosidade</h1>
      <CalculationForm
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleCalculate={handleCalculate}
        calculando={calculando}
      />
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
      {valorPericulosidade !== null && (
        <CalculationResult
          title='Resultado de Periculosidade'
          results={[{ valorPericulosidade }]}
          renderResult={renderPericulosidadeResult}
        />
      )}
    </div>
  );
}

export default PericulosidadeApp;
