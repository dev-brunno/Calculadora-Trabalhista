import React from 'react';
import PropTypes from 'prop-types';

function CalculationResult({ title, results, renderResult }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{renderResult(result)}</li>
        ))}
      </ul>
    </div>
  );
}

CalculationResult.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderResult: PropTypes.func.isRequired,
};

export default CalculationResult;
