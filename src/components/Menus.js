import React, { useState } from 'react';
import MenuItem from './MenuItem';
import FeriasApp from './AppsComponentes/FeriasApp';
import DecimoTerceiroApp from './AppsComponentes/DecimoTerceiroApp';
import FGTSApp from './AppsComponentes/FGTSApp';
import PericulosidadeApp from './AppsComponentes/PericulosidadeApp';
import InsalubridadeApp from './AppsComponentes/InsalubridadeApp';
import TransferenciaApp from './AppsComponentes/TransferenciaApp';

const calculations = [
  { id: 'ferias', title: 'Férias', icon: 'fi fi-rr-umbrella-beach' },
  { id: 'decimoTerceiro', title: 'Décimo Terceiro', icon: 'fi fi-rr-calendar' },
  { id: 'fgts', title: 'FGTS', icon: 'fi fi-rr-sack-dollar' },
  { id: 'periculosidade', title: 'Periculosidade', icon: 'fi fi-rr-hand-holding-skull' },
  { id: 'insalubridade', title: 'Insalubridade', icon: 'fi fi-rr-biohazard' },
  { id: 'transferencia', title: 'Transferência', icon: 'fi fi-rr-replace' },
];

const components = {
  ferias: FeriasApp,
  decimoTerceiro: DecimoTerceiroApp,
  fgts: FGTSApp,
  periculosidade: PericulosidadeApp,
  insalubridade: InsalubridadeApp,
  transferencia: TransferenciaApp,
};

export default function Menus() {
  const [activeComponent, setActiveComponent] = useState('tiposCalculos');
  const [activeCalculation, setActiveCalculation] = useState(null);

  const handleMenuItemClick = (id) => {
    setActiveCalculation(id);
    setActiveComponent('formulariosCalculos');
  };

  const renderActiveComponent = () => {
    if (activeComponent === 'tiposCalculos') {
      return (
        <div className='TiposCalculos grid grid-cols-4 gap-x-0 gap-y-2'>
          {calculations.map((calculation) => (
            <MenuItem
              key={calculation.id}
              icon={calculation.icon}
              title={calculation.title}
              onClick={() => handleMenuItemClick(calculation.id)}
            />
          ))}
        </div>
      );
    } else if (activeComponent === 'formulariosCalculos' && activeCalculation) {
      const ActiveCalculationForm = components[activeCalculation];
      return (
        <div className='FormulariosCalculos'>
          <ActiveCalculationForm />
          <button onClick={() => setActiveComponent('tiposCalculos')}>Voltar</button>
        </div>
      );
    }

    return null;
  };

  return <div className='App'>{renderActiveComponent()}</div>;
}
