import React, { useState } from 'react';
import CalculationCard from './CalculationCard.component';
import FeriasApp from '../../AppsComponentes/CalculosComponentes/FeriasApp';
import DecimoTerceiroApp from '../../AppsComponentes/CalculosComponentes/DecimoTerceiroApp';
import FGTSApp from '../../AppsComponentes/CalculosComponentes/FGTSApp';
import PericulosidadeApp from '../../AppsComponentes/CalculosComponentes/PericulosidadeApp';
import InsalubridadeApp from '../../AppsComponentes/CalculosComponentes/InsalubridadeApp';
import TransferenciaApp from '../../AppsComponentes/CalculosComponentes/TransferenciaApp';

const calculations = [
  { id: 'ferias', title: 'Férias', icon: 'fi fi-rr-umbrella-beach' },
  { id: 'decimoTerceiro', title: 'Décimo Terceiro', icon: 'fi fi-rr-calendar' },
  { id: 'fgts', title: 'FGTS', icon: 'fi fi-rr-sack-dollar' },
  { id: 'transferencia', title: 'Transferência', icon: 'fi fi-rr-replace' },
  {
    id: 'periculosidade',
    title: 'Adicional de Periculosidade',
    icon: 'fi fi-rr-hand-holding-skull',
  },
  { id: 'insalubridade', title: 'Adicional de Insalubridade', icon: 'fi fi-rr-biohazard' },
];

const components = {
  ferias: FeriasApp,
  decimoTerceiro: DecimoTerceiroApp,
  fgts: FGTSApp,
  periculosidade: PericulosidadeApp,
  insalubridade: InsalubridadeApp,
  transferencia: TransferenciaApp,
};

function CalculationContainer() {
  const [activeComponent, setActiveComponent] = useState('tiposCalculos');
  const [activeCalculation, setActiveCalculation] = useState(null);

  const handleCalculationCardClick = (id) => {
    setActiveCalculation(id);
    setActiveComponent('formulariosCalculos');
  };

  const renderActiveComponent = () => {
    if (activeComponent === 'tiposCalculos') {
      return (
        <div>
          <h2 className='text-2xl text-VerdeMedio'>O que você deseja calcular?</h2>
          <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
          <div className='grid gap-2 grid-cols-4'>
            {calculations.map((calculation) => (
              <CalculationCard
                key={calculation.id}
                icon={calculation.icon}
                title={calculation.title}
                onClick={() => handleCalculationCardClick(calculation.id)}
              />
            ))}
          </div>
        </div>
      );
    } else if (activeComponent === 'formulariosCalculos' && activeCalculation) {
      const ActiveCalculationForm = components[activeCalculation];
      return (
        <div className='FormulariosCalculos'>
          <ActiveCalculationForm />
          <div className=' inline-block text-cinzaEscuro absolute bottom-0 left-0 z-0'>
            <button
              onClick={() => setActiveComponent('tiposCalculos')}
              className=' bg-branco shadow-sm p-3 rounded-lg hover:bg-azulEscuro hover:text-branco'
            >
              <i className='fi fi-rr-arrow-small-left'> Cancelar</i>
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return <div>{renderActiveComponent()}</div>;
}

export default CalculationContainer;
