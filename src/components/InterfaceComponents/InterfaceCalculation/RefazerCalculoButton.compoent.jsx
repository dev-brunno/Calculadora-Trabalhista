// RefazerCalculoButton.js
import React from 'react';
import PropTypes from 'prop-types';

function RefazerCalculoButton({ onClick }) {
  return (
    <div className='inline-block absolute -bottom-14 right-0 z-0'>
      <button
        onClick={onClick}
        className='p-3 hover:text-azulEscuro   dark:hover:text-dark3 dark:text-white'
      >
        <div className='flex space-x-2 items-center'>
          <span>Refazer Cálculo</span>
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
