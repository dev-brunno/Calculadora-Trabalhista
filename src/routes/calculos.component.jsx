import React from 'react';
import CalculationContainer from '../components/InterfaceComponents/InterfaceCalculation/CalculationContainer.component';

function Calculos() {
  return (
    <div className=' w-full'>
      <div className=' m-2 mt-8 lg:m-8 flex justify-center lg:justify-start'>
        <div className=' bg-branco dark:bg-dark1 shadow-lg border rounded-4xl border-solid border-cinzaMedio dark:border-dark4 inline-block p-6 pb-16 lg:p-16'>
          <CalculationContainer />
        </div>
      </div>
    </div>
  );
}

export default Calculos;
