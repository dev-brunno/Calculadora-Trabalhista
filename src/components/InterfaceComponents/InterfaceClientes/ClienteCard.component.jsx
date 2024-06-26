import React from 'react';
import PropTypes from 'prop-types';

function ClienteCard({ cliente, onClienteClick }) {
  // Dividir o nome completo em partes (assumindo que o nome é "Nome Sobrenome")
  const partesDoNome = cliente.nome.split(' ');
  const primeiroNome = partesDoNome[0];
  const segundoNome = partesDoNome[1];

  return (
    <div className=' inline-block'>
      <button
        onClick={() => onClienteClick(cliente)}
        className='w-36 h-36 shadow-inner rounded-2xl border border-cinzaClaro p-2 leading-extra-loose text-azulEscuro hover:bg-azulEscuro dark:text-dark3 dark:hover:bg-dark4 dark:hover:text-branco hover:text-branco'
      >
        <div className='flex flex-col items-center'>
          <div className='icon text-5xl p-2 bg-gray-200 dark:bg-dark2 rounded-full w-18'>
            <i className='fi fi-rr-user'></i>
          </div>
          <div>
            <h3 className=' text-sm font-bold  leading-4' style={{ cursor: 'pointer' }}>
              {primeiroNome} {segundoNome}
            </h3>
          </div>
        </div>
      </button>
    </div>
  );
}

ClienteCard.propTypes = {
  cliente: PropTypes.object.isRequired, // De acordo com a estrutura do objeto cliente
  onClienteClick: PropTypes.func.isRequired,
};

export default ClienteCard;
