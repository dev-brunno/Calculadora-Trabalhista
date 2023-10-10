import React, { useState } from 'react';
import CalculationForm from '../../InterfaceComponents/InterfaceCalculation/CalculationForm.component';
import CalculationResult from '../../InterfaceComponents/InterfaceCalculation/CalculationResult.component';
import FGTSCalculator from '../../../Classes/Calculos/FGTSCalculator';
import RefazerCalculoButton from '../../InterfaceComponents/InterfaceCalculation/RefazerCalculoButton.compoent';

function FGTSApp() {
  const [inicioPeriodo, setInicioPeriodo] = useState('2023-01-01');
  const [fimPeriodo, setFimPeriodo] = useState('2023-12-10');
  const [salarioMensal, setSalarioMensal] = useState(3000);
  const [valorFGTS, setValorFGTS] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setValorFGTS(null);
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const fgtsCalculator = new FGTSCalculator(inicioPeriodo, fimPeriodo, salarioMensal);
      const calculatedFGTS = await fgtsCalculator.calcularFGTS();
      setValorFGTS(calculatedFGTS);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular o FGTS. Verifique o valor e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setValorFGTS(null);
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
      id: 'salarioMensal',
      label: 'Salário Mensal',
      type: 'number',
      value: salarioMensal,
      setter: setSalarioMensal,
    },
  ];

  const icon = {
    title: 'FGTS',
    icon: 'fi fi-rr-sack-dollar',
  };

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult title='FGTS' results={valorFGTS} icon={icon} />
          {/* Componente RefazerCalculoButton */}
          <RefazerCalculoButton onClick={handleRefazerCalculo} />
        </div>
      ) : (
        <CalculationForm
          title='Cálulo do FGTS'
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

export default FGTSApp;
