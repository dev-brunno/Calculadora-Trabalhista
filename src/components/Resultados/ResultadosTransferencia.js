import React from 'react';
import PropTypes from 'prop-types';

function ResultadosTransferencia({ valorTransferencia }) {
  return (
    <div>
      <h2>Resultado de Transferência</h2>
      <p>
        O valor da transferência calculado é R${' '}
        {valorTransferencia.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}

ResultadosTransferencia.propTypes = {
  valorTransferencia: PropTypes.number.isRequired,
};

export default ResultadosTransferencia;
