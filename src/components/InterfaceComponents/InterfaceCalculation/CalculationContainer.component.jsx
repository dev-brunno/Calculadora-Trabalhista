import React, { Fragment, useState } from 'react';
import CalculationCard from './CalculationCard.component';
import FeriasApp from '../../AppsComponentes/CalculosComponentes/FeriasApp';
import DecimoTerceiroApp from '../../AppsComponentes/CalculosComponentes/DecimoTerceiroApp';
import FGTSApp from '../../AppsComponentes/CalculosComponentes/FGTSApp';
import PericulosidadeApp from '../../AppsComponentes/CalculosComponentes/PericulosidadeApp';
import InsalubridadeApp from '../../AppsComponentes/CalculosComponentes/InsalubridadeApp';
import TransferenciaApp from '../../AppsComponentes/CalculosComponentes/TransferenciaApp';
import RescisaoApp from '../../AppsComponentes/CalculosComponentes/RescisaoApp';
import NoturnoApp from '../../AppsComponentes/CalculosComponentes/NoturnoApp';
import HorasExtrasApp from '../../AppsComponentes/CalculosComponentes/HorasExtrasApp';

//Um array de objetos que descreve os tipos de cálculos disponíveis.
const calculations = [
  { id: 'horasExtras', title: 'Horas Extras' },
  { id: 'ferias', title: 'Férias' },
  { id: 'decimoTerceiro', title: 'Décimo Terceiro' },
  { id: 'rescisao', title: 'Rescisão' },
  { id: 'fgts', title: 'FGTS' },
  { id: 'transferencia', title: 'Adicional de Transferência' },
  {
    id: 'periculosidade',
    title: 'Adicional de Periculosidade',
  },
  { id: 'insalubridade', title: 'Adicional de Insalubridade' },
  { id: 'noturno', title: 'Adicional Noturno' },
];

//Um objeto que mapeia os tipos de cálculos para os componentes correspondentes.
const components = {
  horasExtras: HorasExtrasApp,
  ferias: FeriasApp,
  decimoTerceiro: DecimoTerceiroApp,
  rescisao: RescisaoApp,
  fgts: FGTSApp,
  transferencia: TransferenciaApp,
  periculosidade: PericulosidadeApp,
  insalubridade: InsalubridadeApp,
  noturno: NoturnoApp,
};

function CalculationContainer() {
  //Define os estados activeComponent para controlar qual componente está ativo e activeCalculation para rastrear qual cálculo foi selecionado.
  const [activeComponent, setActiveComponent] = useState('tiposCalculos');
  const [activeCalculation, setActiveCalculation] = useState(null);

  //Esta função é chamada quando um cartão de cálculo é clicado.
  const handleCalculationCardClick = (id) => {
    setActiveCalculation(id);
    setActiveComponent('formulariosCalculos');
  };

  //renderiza os cartões de cálculo quando activeComponent é 'tiposCalculos' ou renderiza o formulário do cálculo ativo quando activeComponent é 'formulariosCalculos'.
  const renderActiveComponent = () => {
    if (activeComponent === 'tiposCalculos') {
      return (
        <Fragment>
          <h2 className='text-2xl text-VerdeMedio dark:text-dark3'>O que você deseja calcular?</h2>
          <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio dark:bg-dark3 mt-1 mb-5'></hr>
          <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
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
        <div className='FormulariosCalculos relative'>
          <ActiveCalculationForm />
          <div className='absolute -bottom-14 left-0 z-0 text-cinzaMedio'>
            <button
              onClick={() => setActiveComponent('tiposCalculos')}
              className='p-2 h-12 rounded-lg hover:text-azulEscuro'
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
