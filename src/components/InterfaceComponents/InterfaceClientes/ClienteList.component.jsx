import React from 'react';
import PropTypes from 'prop-types';
import ClienteCard from './ClienteCard.component';

function ClienteList({ clientes, onClienteClick }) {
  return (
    <div>
      <h2 className='text-2xl text-VerdeMedio'>Aqui estão seus clientes</h2>
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
      <ul className='grid gap-2 grid-cols-4'>
        {clientes.map((cliente) => (
          <li key={cliente.cpf}>
            {/* Renderize o ClienteCard para cada cliente */}
            <ClienteCard cliente={cliente} onClienteClick={onClienteClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}

ClienteList.propTypes = {
  clientes: PropTypes.array.isRequired,
  onClienteClick: PropTypes.func.isRequired,
};

export default ClienteList;
