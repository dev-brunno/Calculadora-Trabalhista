import React, { useState } from 'react';
import CalculationForm from '../../InterfaceComponents/InterfaceCalculation/CalculationForm.component';
import CalculationResult from '../../InterfaceComponents/InterfaceCalculation/CalculationResult.component';
import ValeTransporteCalculator from '../../../Classes/Calculos/ValeTransporteCalculator';
import RefazerCalculoButton from '../../InterfaceComponents/InterfaceCalculation/RefazerCalculoButton.compoent';

function ValeTransporteApp() {
  const [inicioPeriodo, setInicioPeriodo] = useState('2023-01-01');
  const [fimPeriodo, setFimPeriodo] = useState('2023-12-10');
  const [remuneracao, setRemuneracao] = useState(3000);
  const [valorValeT, setValorValeT] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setValorValeT(null);
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const valeCalculator = new ValeTransporteCalculator(inicioPeriodo, fimPeriodo, remuneracao);
      const valeResults = await valeCalculator.calcular();
      setValorValeT(valeResults);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular o Vale Transporte. Verifique o valor e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setValorValeT(null);
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
      id: 'remuneracao',
      label: 'Remuneração',
      type: 'number',
      value: remuneracao,
      setter: setRemuneracao,
    },
  ];

  const icon = {
    title: 'Vale-transporte',
    icon: 'fi fi-rr-bus-alt',
  };

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult title='Vale-transporte' results={valorValeT} icon={icon} />
          {/* Componente RefazerCalculoButton */}
          <RefazerCalculoButton onClick={handleRefazerCalculo} />
        </div>
      ) : (
        <CalculationForm
          title='Cálulo do Vale-transporte'
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

export default ValeTransporteApp;
