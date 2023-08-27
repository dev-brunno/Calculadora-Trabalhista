import React from 'react';
import PropTypes from 'prop-types';

function ResultadosPericulosidade({ valorPericulosidade }) {
  return (
    <div>
      <h2>Resultado de Periculosidade</h2>
      <p>
        O valor da periculosidade calculado é R${' '}
        {valorPericulosidade.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}

ResultadosPericulosidade.propTypes = {
  valorPericulosidade: PropTypes.number.isRequired,
};

export default ResultadosPericulosidade;
