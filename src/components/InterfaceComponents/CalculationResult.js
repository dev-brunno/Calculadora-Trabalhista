import React from 'react';
import PropTypes from 'prop-types';

function CalculationResult({ title, results, renderResult }) {
  return (
    <div>
      <h2 className='text-2xl text-VerdeMedio'>{title}</h2>
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
      <div className='bg-azulClaro p-8 bg-opacity-40 rounded-2xl'>
        <h4 className='text-VerdeEscuro'>
          <strong>Ganhos do Cliente:</strong>
        </h4>
        <ul className='grid gap-2 grid-cols-2'>
          {results.map((result, index) => (
            <li key={index} className='bg-azulEscuro bg-opacity-40 p-2 mt-2 rounded-2xl'>
              {Array.isArray(result) // Verifica se é um array
                ? result.map((item, itemIndex) => <div key={itemIndex}>{renderResult(item)}</div>)
                : renderResult(result)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

CalculationResult.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
  renderResult: PropTypes.func.isRequired,
};

export default CalculationResult;
