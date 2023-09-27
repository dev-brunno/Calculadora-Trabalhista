import React from 'react';
import CalculationContainer from '../components/InterfaceComponents/InterfaceCalculation/CalculationContainer.component';

function Calculos() {
  return (
    <div className=' w-full'>
      <div className=' m-2 mt-8 lg:m-8 flex justify-start'>
        <div>
          <div className=' bg-branco dark:bg-dark1 shadow-lg lg:p-16 border rounded-4xl border-solid border-cinzaMedio dark:border-dark4 inline-block p-6'>
            <CalculationContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculos;
