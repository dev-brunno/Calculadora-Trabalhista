import React from 'react';
import PropTypes from 'prop-types';

function ClienteList({ clientes, onClienteClick }) {
  return (
    <div>
      <h2 className='text-2xl text-VerdeMedio'>Aqui estão seus clientes</h2>
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.cpf}>
            <span onClick={() => onClienteClick(cliente)} style={{ cursor: 'pointer' }}>
              {cliente.nome}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

ClienteList.propTypes = {
  clientes: PropTypes.array.isRequired,
  onClienteClick: PropTypes.func.isRequired, // Adicione a prop para tratar o clique no cliente
};

export default ClienteList;
