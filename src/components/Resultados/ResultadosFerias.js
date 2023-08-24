import React from 'react';
import PropTypes from 'prop-types';

function ResultadosFerias({ resultados }) {
  return (
    <div>
      <h2>Resultados de Férias</h2>
      <ul>
        {resultados.map((resultado, index) => (
          <li key={index}>
            <strong>Período:</strong> {resultado.periodo}
            <br />
            <strong>Férias:</strong> R${' '}
            {resultado.ferias.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
            <br />
            <strong>Terço Constitucional:</strong> R${' '}
            {resultado.tercoConstitucional.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
            <br />
            {resultado.feriasIndenizatorias !== undefined && (
              <div>
                <strong>Férias Indenizatórias:</strong> R${' '}
                {resultado.feriasIndenizatorias.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
                <br />
              </div>
            )}
            {resultado.feriasProporcionais !== undefined && (
              <div>
                <strong>Férias Proporcionais:</strong> R${' '}
                {resultado.feriasProporcionais.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
                <br />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

ResultadosFerias.propTypes = {
  resultados: PropTypes.arrayOf(
    PropTypes.shape({
      periodo: PropTypes.string.isRequired,
      ferias: PropTypes.number.isRequired,
      tercoConstitucional: PropTypes.number.isRequired,
      feriasIndenizatorias: PropTypes.number,
      feriasProporcionais: PropTypes.number,
    }),
  ).isRequired,
};

export default ResultadosFerias;
