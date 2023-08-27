import React from 'react';
import PropTypes from 'prop-types';

function ResultadosFGTS({ valorFGTS }) {
  return (
    <div>
      <h2>Resultado do FGTS</h2>
      <p>
        O valor do FGTS calculado é R${' '}
        {valorFGTS.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}

ResultadosFGTS.propTypes = {
  valorFGTS: PropTypes.number.isRequired,
};

export default ResultadosFGTS;
