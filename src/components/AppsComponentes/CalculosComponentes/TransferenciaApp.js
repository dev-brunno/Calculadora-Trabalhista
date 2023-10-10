import React, { useState } from 'react';
import CalculationForm from '../../InterfaceComponents/InterfaceCalculation/CalculationForm.component';
import CalculationResult from '../../InterfaceComponents/InterfaceCalculation/CalculationResult.component';
import TransferenciaCalculator from '../../../Classes/Calculos/TransferenciaCalculator';
import RefazerCalculoButton from '../../InterfaceComponents/InterfaceCalculation/RefazerCalculoButton.compoent';

function TransferenciaApp() {
  const [inicioPeriodo, setInicioPeriodo] = useState('2023-01-01');
  const [fimPeriodo, setFimPeriodo] = useState('2023-12-10');
  const [remuneracao, setRemuneracao] = useState(2000);
  const [porcentagem, setPorcentagem] = useState(10);
  const [valorTransferencia, setValorTransferencia] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setValorTransferencia(null);
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const transferenciaCalculator = new TransferenciaCalculator(
        inicioPeriodo,
        fimPeriodo,
        remuneracao,
        porcentagem,
      );
      const calculatedTransferencia = await transferenciaCalculator.calcularTransferencia();
      setValorTransferencia(calculatedTransferencia);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular transferência. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setValorTransferencia(null);
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
      min: 0,
      step: 100,
    },
    {
      id: 'porcentagem',
      label: 'Porcentagem',
      type: 'tel',
      value: porcentagem,
      setter: setPorcentagem,
      min: 0,
      step: 1,
    },
  ];

  const icon = {
    title: 'Transferência',
    icon: 'fi fi-rr-replace',
  };

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult title='Transferência' results={valorTransferencia} icon={icon} />
          {/* Componente RefazerCalculoButton */}
          <RefazerCalculoButton onClick={handleRefazerCalculo} />
        </div>
      ) : (
        <CalculationForm
          title='Cálculo de Transferência'
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

export default TransferenciaApp;
