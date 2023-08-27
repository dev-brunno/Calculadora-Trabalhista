import React, { useState } from 'react';
import CalculationForm from '../CalculationForm'; // Importe o componente CalculationForm
import CalculationResult from '../CalculationResult';
import PericulosidadeCalculator from '../../Calculos/PericulosidadeCalculator';

function PericulosidadeApp() {
  const [salarioBase, setSalarioBase] = useState(2000);
  const [valorPericulosidade, setValorPericulosidade] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setValorPericulosidade(null);
    setter(event.target.value);
  };

  const handleCalculate = () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const periculosidadeCalculator = new PericulosidadeCalculator(salarioBase);
      const calculatedPericulosidade = periculosidadeCalculator.calcularPericulosidade();
      setValorPericulosidade(calculatedPericulosidade);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular periculosidade. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setValorPericulosidade(null);
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

  const renderPericulosidadeResult = (valor) => (
    <div>
      <strong>Valor da periculosidade calculado:</strong> R${' '}
      {valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}
    </div>
  );

  return (
    <div>
      <h1>Calculadora de Periculosidade</h1>
      {mostrarResultados ? (
        <div>
          <CalculationResult
            title='Resultado de Periculosidade'
            results={[valorPericulosidade]}
            renderResult={renderPericulosidadeResult}
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

export default PericulosidadeApp;
