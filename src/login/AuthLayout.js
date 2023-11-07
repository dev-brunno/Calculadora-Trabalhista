// AuthLayout.js
import React from 'react';
import PropTypes from 'prop-types';

function AuthLayout({ children }) {
  return (
    <div className='bg-brancoMedio w-full flex flex-col lg:flex-row mb-20 lg:mb-0'>
      <div className=' lg:w-1/2'>
        <div className=' bg-cinzaClaro h-60 rounded-b-full shadow-md'>
          <div className=' bg-azulEscuro h-56 rounded-b-full flex justify-center items-center'>
            <h1 className=' text-6xl font-bold text-white'>Bem Vindo!</h1>
          </div>
        </div>
        <div>
          <p className=' border border-gray-300 p-3 w-80 m-auto mt-16 rounded-md text-justify'>
            Sabemos que o mundo das leis trabalhistas pode ser complexo e desafiador, por isso,
            desenvolvemos o <span className=' text-azulEscuro'>Sistema de Cálculos Trabalhista</span>, um
            sistema intuitivo e fácil de usar, projetado para ajudá-lo a navegar pelos cálculos
            trabalhistas com confiança e eficiência.
          </p>
        </div>
      </div>
      <div className=' lg:w-1/2'>{children}</div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node, // Validação de tipo para a propriedade 'children'
};

export default AuthLayout;
