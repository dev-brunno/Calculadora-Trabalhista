import React from 'react';
import PropTypes from 'prop-types';
import '@flaticon/flaticon-uicons/css/all/all.css';

const calculations = {
  'Horas Extras': 'fi fi-rr-time-add',
  Férias: 'fi fi-rr-umbrella-beach',
  'Décimo Terceiro': 'fi fi-rr-calendar',
  Rescisão: 'fi fi-rr-file-circle-info',
  FGTS: 'fi fi-rr-sack-dollar',
  'Adicional Noturno': 'fi fi-rr-moon-stars',
  'Adicional de Periculosidade': 'fi fi-rr-hand-holding-skull',
  'Adicional de Insalubridade': 'fi fi-rr-biohazard',
  'Adicional de Transferência': 'fi fi-rr-replace',
  'Vale-transporte': 'fi fi-rr-bus-alt',
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
