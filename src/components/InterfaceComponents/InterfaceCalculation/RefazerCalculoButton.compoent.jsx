// RefazerCalculoButton.js
import React from 'react';
import PropTypes from 'prop-types';

function RefazerCalculoButton({ onClick }) {
  return (
    <div className='inline-block absolute bottom-0 right-0 z-0'>
      <button onClick={onClick} className='bg-branco shadow-sm p-3 rounded-lg'>
        <div className=' text-azulEscuro'>
          <i>Refazer Cálculo </i>
          <i className='fi fi-rr-arrow-small-right'></i>
        </div>
      </button>
    </div>
  );
}

RefazerCalculoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RefazerCalculoButton;
