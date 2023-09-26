// RefazerCalculoButton.js
import React from 'react';
import PropTypes from 'prop-types';

function RefazerCalculoButton({ onClick }) {
  return (
    <div className='inline-block absolute bottom-0 right-0 z-0'>
      <button
        onClick={onClick}
        className='bg-branco shadow-sm p-3 rounded-lg text-azulEscuro hover:text-branco hover:bg-azulEscuro'
      >
        <div className='flex space-x-2 items-center'>
          <i>Refazer Cálculo </i>
          <i className='fi fi-rr-rotate-left mt-2'></i>
        </div>
      </button>
    </div>
  );
}

RefazerCalculoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RefazerCalculoButton;
