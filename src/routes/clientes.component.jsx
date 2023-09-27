import React from 'react';
import ClientesApp from '../components/AppsComponentes/ClientesComponentes/ClientesApp';

function Clientes() {
  return (
    <div className=''>
      <div className=' pb-16 relative m-8 flex justify-center'>
        <div className='  bg-branco dark:bg-dark1 shadow-lg md:p-16 border rounded-4xl border-solid border-cinzaMedio dark:border-dark2 inline-block p-6'>
          <ClientesApp />
        </div>
      </div>
    </div>
  );
}

export default Clientes;
