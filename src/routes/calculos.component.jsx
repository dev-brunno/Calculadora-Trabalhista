import React from 'react';
import CalculationContainer from '../components/InterfaceComponents/InterfaceCalculation/CalculationContainer.component';

function Calculos() {
  return (
    <div className=''>
      <div className=' pb-16 relative m-8 flex justify-center'>
        <div className=' bg-branco dark:bg-dark1 shadow-lg md:p-16 border rounded-4xl border-solid border-cinzaMedio inline-block p-6'>
          <CalculationContainer />
        </div>
      </div>
    </div>
  );
}

export default Calculos;
