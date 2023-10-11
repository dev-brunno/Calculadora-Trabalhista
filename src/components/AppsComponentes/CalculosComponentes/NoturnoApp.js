import React, { useState } from 'react';
import CalculationForm from '../../InterfaceComponents/InterfaceCalculation/CalculationForm.component';
import CalculationResult from '../../InterfaceComponents/InterfaceCalculation/CalculationResult.component';
import NoturnoCalculator from '../../../Classes/Calculos/NoturnoCalculator';
import RefazerCalculoButton from '../../InterfaceComponents/InterfaceCalculation/RefazerCalculoButton.compoent';

// ...imports e imports de componentes

function NoturnoApp() {
  const [ultimaRemuneracao, setUltimaRemuneracao] = useState(1320);
  const [horasTrabalhadasSem, setHorasTrabalhadasSem] = useState(44);
  const [tipoEmpregado, setTipoEmpregado] = useState('20');
  const [horasTrabalhadasNortuna, setHorasTrabalhadasNortuna] = useState(25);
  const [valorNoturno, setValorNoturno] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setValorNoturno(null);
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const noturnoCalculator = new NoturnoCalculator(
        horasTrabalhadasSem,
        ultimaRemuneracao,
        tipoEmpregado,
        horasTrabalhadasNortuna,
      );
      const calculatedNoturno = await noturnoCalculator.calcularNoturno();
      setValorNoturno(calculatedNoturno);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular Noturno. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setValorNoturno(null);
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
      id: 'tipoEmpregado',
      label: 'Modalidade de Empregado',
      type: 'select',
      value: tipoEmpregado,
      setter: setTipoEmpregado,
      options: [
        { value: '20', label: 'Empregado Urbano (20%)' },
        { value: '25', label: 'Empregado Rural (25%)' },
      ],
    },
    {
      id: 'horasTrabalhadasNortuna',
      label: 'Horas Trabalhadas Noturnas',
      type: 'tel',
      value: horasTrabalhadasNortuna,
      setter: setHorasTrabalhadasNortuna,
    },
  ];

  const icon = {
    title: 'Noturno',
    icon: 'fi fi-rr-moon-stars',
  };

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult title='Adicional Noturno' results={valorNoturno} icon={icon} />
          {/* Componente RefazerCalculoButton */}
          <RefazerCalculoButton onClick={handleRefazerCalculo} />
        </div>
      ) : (
        <CalculationForm
          title='Cálculo de Adicional Noturno'
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

export default NoturnoApp;
