import React, { useState } from 'react';
import CalculationForm from '../CalculationForm'; // Importe o componente CalculationForm
import CalculationResult from '../CalculationResult';
import InsalubridadeCalculator from '../../Calculos/InsalubridadeCalculator';

function InsalubridadeApp() {
  const [salarioBase, setSalarioBase] = useState(2000);
  const [grauInsalubridade, setGrauInsalubridade] = useState('10');
  const [valorInsalubridade, setValorInsalubridade] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null); // Estado para tratar erros

  const handleInputChange = (event, setter) => {
    setValorInsalubridade(null); // Limpa os resultados ao alterar campos
    setter(event.target.value);
  };

  const handleCalculate = () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const insalubridadeCalculator = new InsalubridadeCalculator(salarioBase, grauInsalubridade);
      const calculatedInsalubridade = insalubridadeCalculator.calcularInsalubridade();
      setValorInsalubridade(calculatedInsalubridade);
    } catch (error) {
      console.error('Erro ao calcular insalubridade:', error);
      setErroCalculo('Erro ao calcular insalubridade. Verifique os valores e tente novamente.');
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
    {
      id: 'grauInsalubridade',
      label: 'Grau de Insalubridade',
      type: 'select',
      value: grauInsalubridade,
      setter: setGrauInsalubridade,
      options: [
        { value: '10', label: 'Grau Mínimo (10%)' },
        { value: '20', label: 'Grau Médio (20%)' },
        { value: '40', label: 'Grau Máximo (40%)' },
      ],
    },
  ];

  const renderInsalubridadeResult = (result) => (
    <div>
      <p>
        O valor do adicional de insalubridade calculado é R${' '}
        {result.valorInsalubridade.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );

  return (
    <div>
      <h1>Calculadora de Insalubridade</h1>
      <CalculationForm
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleCalculate={handleCalculate}
        calculando={calculando}
      />
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
      {valorInsalubridade !== null && (
        <CalculationResult
          title='Resultado de Insalubridade'
          results={[{ valorInsalubridade }]}
          renderResult={renderInsalubridadeResult}
        />
      )}
    </div>
  );
}

export default InsalubridadeApp;
