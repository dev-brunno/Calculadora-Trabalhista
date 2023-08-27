import React from 'react';
import PropTypes from 'prop-types';
import '@flaticon/flaticon-uicons/css/all/all.css';

function CalculationIcon({ icon: Icon }) {
  return (
    <div className='icon'>
      <i className={Icon} style={{ fontSize: 50 }}>
        {' '}
      </i>
    </div>
  );
}

// Adicione as validações de PropTypes
CalculationIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
};

export default CalculationIcon;
