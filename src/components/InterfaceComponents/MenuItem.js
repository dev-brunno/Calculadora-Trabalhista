import React from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes
import CalculationIcon from './CalculationIcon';

function MenuItem({ icon, title, onClick }) {
  return (
    <div className=' inline-block'>
      <button
        onClick={onClick}
        className=' w-36 h-20 shadow-inner rounded-2xl border border-cinzaClaro p-2 text-azulEscuro '
      >
        <CalculationIcon icon={icon} />
        <span className=' text-sm font-bold'>{title}</span>
      </button>
    </div>
  );
}

// Adicione as validações de PropTypes
MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuItem;
