import React, { useState } from 'react';
import MenuItem from './MenuItem';
import FeriasApp from './AppsComponentes/FeriasApp';
import DecimoTerceiroApp from './AppsComponentes/DecimoTerceiroApp';
import FGTSApp from './AppsComponentes/FGTSApp';
import PericulosidadeApp from './AppsComponentes/PericulosidadeApp';
import InsalubridadeApp from './AppsComponentes/InsalubridadeApp';
import TransferenciaApp from './AppsComponentes/TransferenciaApp';

const calculations = [
  { id: 'ferias', title: 'Cálculo de Férias', icon: 'fi fi-rr-umbrella-beach' },
  { id: 'decimoTerceiro', title: 'Cálculo de Décimo Terceiro Salário', icon: 'fi fi-rr-calendar' },
  { id: 'fgts', title: 'Cálculo de FGTS', icon: 'fi fi-rr-sack-dollar' },
  { id: 'periculosidade', title: 'Cálculo de Periculosidade', icon: 'fi fi-rr-hand-holding-skull' },
  { id: 'insalubridade', title: 'Cálculo de Insalubridade', icon: 'fi fi-rr-biohazard' },
  { id: 'transferencia', title: 'Cálculo de Transferência', icon: 'fi fi-rr-replace' },
];

export default function Menus() {
  const [activeComponent, setActiveComponent] = useState('ferias');

  const renderActiveComponent = () => {
    const components = {
      ferias: FeriasApp,
      decimoTerceiro: DecimoTerceiroApp,
      fgts: FGTSApp,
      periculosidade: PericulosidadeApp,
      insalubridade: InsalubridadeApp,
      transferencia: TransferenciaApp,
    };

    const ActiveComponent = components[activeComponent];
    return <ActiveComponent />;
  };

  const handleMenuItemClick = (id) => {
    setActiveComponent(id);
  };

  return (
    <div className='App'>
      <div>
        {calculations.map((calculation) => (
          <MenuItem
            key={calculation.id}
            icon={calculation.icon}
            title={calculation.title}
            onClick={() => handleMenuItemClick(calculation.id)}
          />
        ))}
      </div>
      <div>{renderActiveComponent()}</div>
    </div>
  );
}
