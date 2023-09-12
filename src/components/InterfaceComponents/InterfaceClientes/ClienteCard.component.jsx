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
        className='w-36 shadow-inner rounded-2xl border border-cinzaClaro p-2 text-azulEscuro leading-extra-loose '
      >
        <div className='icon text-5xl'>
          <i className='fi fi-rr-user'></i>
        </div>
        <span className=' text-sm font-bold' style={{ cursor: 'pointer' }}>
          {primeiroNome} {segundoNome}
        </span>
      </button>
    </div>
  );
}

ClienteCard.propTypes = {
  cliente: PropTypes.object.isRequired, // De acordo com a estrutura do objeto cliente
  onClienteClick: PropTypes.func.isRequired,
};

export default ClienteCard;
