import React from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes
import CalculationIcon from './CalculationIcon';

function MenuItem({ icon, title, onClick }) {
  console.log(icon);
  return (
    <button
      onClick={onClick}
      className=' w-40 h-20 shadow-sm rounded-2xl border border-cinzaClaro p-2 text-azulEscuro '
    >
      <CalculationIcon icon={icon} />
      <span className=' text-base font-bold'>{title}</span>
    </button>
  );
}

// Adicione as validações de PropTypes
MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuItem;
