import React from 'react';
import ClientesApp from '../components/AppsComponentes/ClientesComponentes/ClientesApp';

function Clientes() {
  return (
    <div className=' w-full'>
      <div className=' m-2 mt-8 lg:m-8 flex justify-center lg:justify-start'>
        <div className='  bg-branco dark:bg-dark1 shadow-lg md:p-8 border rounded-4xl border-solid border-cinzaMedio dark:border-dark2 inline-block p-6 pb-16 lg:p-16'>
          <ClientesApp />
        </div>
      </div>
    </div>
  );
}

export default Clientes;
