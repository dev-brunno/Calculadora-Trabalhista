import React, { Fragment, useState } from 'react';
import CalculationCard from './CalculationCard.component';
import FeriasApp from '../../AppsComponentes/CalculosComponentes/FeriasApp';
import DecimoTerceiroApp from '../../AppsComponentes/CalculosComponentes/DecimoTerceiroApp';
import FGTSApp from '../../AppsComponentes/CalculosComponentes/FGTSApp';
import PericulosidadeApp from '../../AppsComponentes/CalculosComponentes/PericulosidadeApp';
import InsalubridadeApp from '../../AppsComponentes/CalculosComponentes/InsalubridadeApp';
import TransferenciaApp from '../../AppsComponentes/CalculosComponentes/TransferenciaApp';

const calculations = [
  { id: 'ferias', title: 'Férias' },
  { id: 'decimoTerceiro', title: 'Décimo Terceiro' },
  { id: 'fgts', title: 'FGTS' },
  { id: 'transferencia', title: 'Transferência' },
  {
    id: 'periculosidade',
    title: 'Adicional de Periculosidade',
  },
  { id: 'insalubridade', title: 'Adicional de Insalubridade' },
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
        <Fragment>
          <h2 className='text-2xl text-VerdeMedio dark:text-dark3'>O que você deseja calcular?</h2>
          <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio dark:bg-dark3 mt-1 mb-5'></hr>
          <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
            {calculations.map((calculation) => (
              <CalculationCard
                key={calculation.id}
                icon={calculation.title}
                title={calculation.title}
                onClick={() => handleCalculationCardClick(calculation.id)}
              />
            ))}
          </div>
        </Fragment>
      );
    } else if (activeComponent === 'formulariosCalculos' && activeCalculation) {
      const ActiveCalculationForm = components[activeCalculation];
      return (
        <div className='FormulariosCalculos'>
          <ActiveCalculationForm />
          <div className=' inline-block text-cinzaEscuro dark:text-dark3 absolute bottom-0 left-0 z-0'>
            <button
              onClick={() => setActiveComponent('tiposCalculos')}
              className=' bg-branco dark:bg-dark2 shadow-sm p-2 h-12 rounded-lg hover:bg-azulEscuro hover:text-branco'
            >
              <div className='flex space-x-2'>
                <i className='fi fi-rr-arrow-small-left mt-1'> </i>
                <h5>Cancelar</h5>
              </div>
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
