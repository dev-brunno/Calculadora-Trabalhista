import React from 'react';
import PropTypes from 'prop-types';

function ResultadosInsalubridade({ valorInsalubridade }) {
  return (
    <div>
      <h2>Resultado de Insalubridade</h2>
      <p>
        O valor do adicional de insalubridade calculado é R${' '}
        {valorInsalubridade.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}

ResultadosInsalubridade.propTypes = {
  valorInsalubridade: PropTypes.number.isRequired,
};

export default ResultadosInsalubridade;
