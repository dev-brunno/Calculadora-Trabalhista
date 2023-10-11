import React, { useState } from 'react';
import CalculationForm from '../../InterfaceComponents/InterfaceCalculation/CalculationForm.component';
import CalculationResult from '../../InterfaceComponents/InterfaceCalculation/CalculationResult.component';
import RefazerCalculoButton from '../../InterfaceComponents/InterfaceCalculation/RefazerCalculoButton.compoent';
import HorasExtrasCalculator from '../../../Classes/Calculos/HorasExtrasCalculator';
// ...imports e imports de componentes

function HorasExtrasApp() {
  const [ultimaRemuneracao, setUltimaRemuneracao] = useState(1320);
  const [horasTrabalhadasSem, setHorasTrabalhadasSem] = useState(44);
  const [tipoDia, setTipoDia] = useState('50');
  const [horasExtrasTrabalhadas, setHorasExtrasTrabalhadas] = useState(25);
  const [valorHorasExtras, setValorHorasExtras] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setValorHorasExtras(null);
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const horasExtrasCalculator = new HorasExtrasCalculator(
        horasTrabalhadasSem,
        ultimaRemuneracao,
        tipoDia,
        horasExtrasTrabalhadas,
      );
      const calculatedHorasExtras = await horasExtrasCalculator.calcular();
      setValorHorasExtras(calculatedHorasExtras);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular Noturno. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setValorHorasExtras(null);
  };

  const inputs = [
    {
      id: 'horasTrabalhadasSem',
      label: 'Horas Trabalhadas Semanais',
      type: 'tel',
      value: horasTrabalhadasSem,
      setter: setHorasTrabalhadasSem,
    },
    {
      id: 'ultimaRemuneracao',
      label: 'Última Remuneração',
      type: 'number',
      value: ultimaRemuneracao,
      setter: setUltimaRemuneracao,
    },
    {
      id: 'tipoDia',
      label: 'Modalidade de Empregado',
      type: 'select',
      value: tipoDia,
      setter: setTipoDia,
      options: [
        { value: '50', label: 'Dias Úteis (50%)' },
        { value: '100', label: 'Domingos e Feriados (100%)' },
      ],
    },
    {
      id: 'horasExtrasTrabalhadas',
      label: 'Horas Extras Trabalhadas',
      type: 'tel',
      value: horasExtrasTrabalhadas,
      setter: setHorasExtrasTrabalhadas,
    },
  ];

  const icon = {
    title: 'Horas Extras',
    icon: 'fi fi-rr-time-add',
  };

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult title='Horas Extras' results={valorHorasExtras} icon={icon} />
          {/* Componente RefazerCalculoButton */}
          <RefazerCalculoButton onClick={handleRefazerCalculo} />
        </div>
      ) : (
        <CalculationForm
          title='Cálculo de Horas Extras'
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

export default HorasExtrasApp;
