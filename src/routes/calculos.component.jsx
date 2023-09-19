import React from 'react';
import CalculationContainer from '../components/InterfaceComponents/InterfaceCalculation/CalculationContainer.component';

function Calculos() {
  return (
    <div className=''>
      <div className=' pb-16 relative m-8'>
        <div className=' w-max-12/12 bg-branco shadow-lg p-16 border rounded-4xl border-solid border-cinzaMedio'>
          <CalculationContainer />
        </div>
      </div>
    </div>
  );
}

export default Calculos;
