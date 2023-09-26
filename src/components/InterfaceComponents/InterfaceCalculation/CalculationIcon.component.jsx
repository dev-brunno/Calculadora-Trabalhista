import React from 'react';
import PropTypes from 'prop-types';
import '@flaticon/flaticon-uicons/css/all/all.css';

const calculations = {
  Férias: 'fi fi-rr-umbrella-beach',
  'Décimo Terceiro': 'fi fi-rr-calendar',
  FGTS: 'fi fi-rr-sack-dollar',
  Transferência: 'fi fi-rr-replace',
  'Adicional de Periculosidade': 'fi fi-rr-hand-holding-skull',
  'Adicional de Insalubridade': 'fi fi-rr-biohazard',
};

function CalculationIcon({ icon: Icon }) {
  return (
    <div className='icon text-3xl'>
      <i className={calculations[Icon]}></i>
    </div>
  );
}

// Adicione as validações de PropTypes
CalculationIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
};

export default CalculationIcon;
