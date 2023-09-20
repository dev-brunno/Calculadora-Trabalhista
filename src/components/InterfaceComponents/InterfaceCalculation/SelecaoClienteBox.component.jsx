import React from 'react';
import PropTypes from 'prop-types';
import ClienteCard from '../InterfaceClientes/ClienteCard.component';

// Componente separado para a caixa de seleção de cliente
function SelecaoClienteBox({ clientes, onClienteSelecionado, onClose }) {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50 z-10'>
      <div className='bg-white p-4 rounded-2xl shadow-lg'>
        <h3 className='text-lg font-semibold mb-4'>Selecione um Cliente:</h3>
        <ul className='grid gap-2 grid-cols-4'>
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              onClick={() => onClienteSelecionado(cliente.id)}
              className='cursor-pointer hover:bg-gray-200 p-2 rounded'
            >
              {/* Renderize o componente ClienteCard aqui */}
              <ClienteCard cliente={cliente} onClienteClick={onClienteSelecionado} />
            </li>
          ))}
        </ul>
        <button
          onClick={onClose} // Adicione a função para fechar a caixa de seleção
          className='mt-4 p-2  text-cinzaEscuro rounded border border-cinzaEscuro hover:bg-azulEscuro hover:text-branco'
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default SelecaoClienteBox;

SelecaoClienteBox.propTypes = {
  clientes: PropTypes.array.isRequired,
  onClienteSelecionado: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
