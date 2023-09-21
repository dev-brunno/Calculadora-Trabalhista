import React from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes
import CalculationIcon from './CalculationIcon.component';

function CalculationCard({ icon, title, onClick }) {
  return (
    <div className=' inline-block'>
      <button
        onClick={onClick}
        className=' w-36 h-24 shadow-inner rounded-2xl border border-cinzaClaro text-azulEscuro hover:bg-VerdeMedio hover:text-branco'
      >
        <div>
          <CalculationIcon icon={icon} />
          <h3 className=' text-sm font-bold leading-4'>{title}</h3>
        </div>
      </button>
    </div>
  );
}

// Adicione as validações de PropTypes
CalculationCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CalculationCard;
