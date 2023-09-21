import React from 'react';
import ClientesApp from '../components/AppsComponentes/ClientesComponentes/ClientesApp';

function Clientes() {
  return (
    <div className=''>
      <div className=' pb-16 relative m-8'>
        <div className=' w-max-12/12 bg-branco shadow-lg p-16 border rounded-4xl border-solid border-cinzaMedio'>
          <ClientesApp />
        </div>
      </div>
    </div>
  );
}

export default Clientes;
