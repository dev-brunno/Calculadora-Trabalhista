import React, { useState } from 'react';
import CalculationForm from '../../InterfaceComponents/InterfaceCalculation/CalculationForm.component';
import CalculationResult from '../../InterfaceComponents/InterfaceCalculation/CalculationResult.component';
import RescisaoContratoCalculator from '../../../Classes/Calculos/RescisaoContratoCalculator';
import RefazerCalculoButton from '../../InterfaceComponents/InterfaceCalculation/RefazerCalculoButton.compoent';

function RescisaoApp() {
  const [inicioContrato, setInicioContrato] = useState('2022-01-01');
  const [fimContrato, setFimContrato] = useState('2024-09-30');
  const [remuneracao, setRemuneracao] = useState(1200);
  const [depositoFGTS, setdepositoFGTS] = useState(1200);
  const [descontos, setDescontos] = useState(0);
  const [resultados, setResultados] = useState([]);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setResultados([]);
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const calculator = new RescisaoContratoCalculator(
        inicioContrato,
        fimContrato,
        remuneracao,
        depositoFGTS,
        descontos,
      );
      const calculatedResults = await calculator.calcularRescisao();
      setResultados(calculatedResults);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular rescisão. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setResultados([]);
  };

  const inputs = [
    {
      id: 'inicioContrato',
      label: 'Data de Início do Contrato',
      type: 'date',
      value: inicioContrato,
      setter: setInicioContrato,
    },
    {
      id: 'fimContrato',
      label: 'Data de Término do Contrato',
      type: 'date',
      value: fimContrato,
      setter: setFimContrato,
    },
    {
      id: 'remuneracao',
      label: 'Remuneração da Última Férias',
      type: 'number',
      value: remuneracao,
      setter: setRemuneracao,
    },
    {
      id: 'depositofgts',
      label: 'Depósito FGTS',
      type: 'number',
      value: depositoFGTS,
      setter: setdepositoFGTS,
    },
    {
      id: 'descontos',
      label: 'Descontos',
      type: 'number',
      value: descontos,
      setter: setDescontos,
    },
  ];

  const icon = {
    title: 'Rescisão',
    icon: 'fi fi-rr-file-circle-info',
  };

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult title='Rescisão' results={resultados} icon={icon} />
          {/* Componente RefazerCalculoButton */}
          <RefazerCalculoButton onClick={handleRefazerCalculo} />
        </div>
      ) : (
        <CalculationForm
          title='Cálculo de Rescisão'
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

export default RescisaoApp;
