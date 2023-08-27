import React from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes
import CalculationIcon from './CalculationIcon';

function MenuItem({ icon, title, onClick }) {
  console.log(icon);
  return (
    <button onClick={onClick}>
      <CalculationIcon icon={icon} />
      {title}
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
