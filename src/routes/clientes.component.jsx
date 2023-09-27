import React from 'react';
import ClientesApp from '../components/AppsComponentes/ClientesComponentes/ClientesApp';

function Clientes() {
  return (
    <div className=' w-full'>
      <div className=' m-2 mt-8 lg:m-8 flex justify-start'>
        <div className='relative pb-16'>
          <div className='  bg-branco dark:bg-dark1 shadow-lg md:p-8 lg:p-16 border rounded-4xl border-solid border-cinzaMedio dark:border-dark2 inline-block p-6'>
            <ClientesApp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clientes;
