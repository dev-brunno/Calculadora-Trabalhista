import React, { useState } from 'react';
import CalculationForm from '../../InterfaceComponents/InterfaceCalculation/CalculationForm.component';
import CalculationResult from '../../InterfaceComponents/InterfaceCalculation/CalculationResult.component';
import PericulosidadeCalculator from '../../../Classes/Calculos/PericulosidadeCalculator';
import RefazerCalculoButton from '../../InterfaceComponents/InterfaceCalculation/RefazerCalculoButton.compoent';

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

  const icon = {
    title: 'Periculosidade',
    icon: 'fi fi-rr-hand-holding-skull',
  };

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult
            title='Resultado de Periculosidade'
            results={[valorPericulosidade]}
            icon={icon}
          />
          {/* Componente RefazerCalculoButton */}
          <RefazerCalculoButton onClick={handleRefazerCalculo} />
        </div>
      ) : (
        <CalculationForm
          title='Cálculo de Periculosidade'
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
