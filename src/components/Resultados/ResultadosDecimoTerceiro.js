import React from 'react';
import PropTypes from 'prop-types';

function ResultadosDecimoTerceiro({ resultados }) {
  return (
    <div>
      <h2>Resultados do Décimo Terceiro</h2>
      <ul>
        {resultados.map((resultado, index) => (
          <li key={index}>
            <strong>Ano Correspondente:</strong> {resultado.anoCorrespondente}
            <br />
            <strong>Período:</strong> {resultado.periodo}
            <br />
            <strong>Valor do Décimo Terceiro:</strong> R${' '}
            {resultado.valorDecimoTerceiro.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
            <br />
            {/* Pode adicionar campos opcionais aqui */}
          </li>
        ))}
      </ul>
    </div>
  );
}

ResultadosDecimoTerceiro.propTypes = {
  resultados: PropTypes.arrayOf(
    PropTypes.shape({
      anoCorrespondente: PropTypes.number.isRequired,
      periodo: PropTypes.string.isRequired,
      valorDecimoTerceiro: PropTypes.number.isRequired,
      // Pode adicionar campos opcionais aqui, se necessário
    }),
  ).isRequired,
};

export default ResultadosDecimoTerceiro;
