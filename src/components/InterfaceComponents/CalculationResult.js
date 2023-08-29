import React from 'react';
import PropTypes from 'prop-types';

function CalculationResult({ title, results, renderResult }) {
  return (
    <div>
      <h2 className='text-2xl text-VerdeMedio'>{title}</h2>
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
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
