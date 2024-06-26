import React, { useState } from 'react';
import CalculationForm from '../../InterfaceComponents/InterfaceCalculation/CalculationForm.component';
import CalculationResult from '../../InterfaceComponents/InterfaceCalculation/CalculationResult.component';
import InsalubridadeCalculator from '../../../Classes/Calculos/InsalubridadeCalculator';
import RefazerCalculoButton from '../../InterfaceComponents/InterfaceCalculation/RefazerCalculoButton.compoent';

// ...imports e imports de componentes

function InsalubridadeApp() {
  const [inicioPeriodo, setInicioPeriodo] = useState('2023-01-01');
  const [fimPeriodo, setFimPeriodo] = useState('2023-12-10');
  const [salarioBase, setSalarioBase] = useState(2000);
  const [grauInsalubridade, setGrauInsalubridade] = useState('10');
  const [valorInsalubridade, setValorInsalubridade] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setValorInsalubridade(null);
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const insalubridadeCalculator = new InsalubridadeCalculator(
        inicioPeriodo,
        fimPeriodo,
        salarioBase,
        grauInsalubridade,
      );
      const calculatedInsalubridade = await insalubridadeCalculator.calcularInsalubridade();
      setValorInsalubridade(calculatedInsalubridade);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular insalubridade. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setValorInsalubridade(null);
  };

  const inputs = [
    {
      id: 'inicioPeriodo',
      label: 'Data de Início do Periodo',
      type: 'date',
      value: inicioPeriodo,
      setter: setInicioPeriodo,
    },
    {
      id: 'fimPeriodo',
      label: 'Data de Término do Periodo',
      type: 'date',
      value: fimPeriodo,
      setter: setFimPeriodo,
    },
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

  const icon = {
    title: 'Insalubridade',
    icon: 'fi fi-rr-biohazard',
  };

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult
            title='Adicional de Insalubridade'
            results={valorInsalubridade}
            icon={icon}
          />
          {/* Componente RefazerCalculoButton */}
          <RefazerCalculoButton onClick={handleRefazerCalculo} />
        </div>
      ) : (
        <CalculationForm
          title='Cálculo Adicional de Insalubridade'
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

export default InsalubridadeApp;
