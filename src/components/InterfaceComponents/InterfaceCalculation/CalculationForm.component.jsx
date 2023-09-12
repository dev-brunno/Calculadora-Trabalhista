import React from 'react';
import PropTypes from 'prop-types';

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function CalculationForm({ title, inputs, handleInputChange, handleCalculate, calculando }) {
  return (
    <div>
      {/* Renderize os campos do formulário com base nos "inputs" passados */}
      <h2 className='text-2xl text-VerdeMedio'>{title}</h2>
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
      <div className='text-lg flex flex-col space-y-4'>
        {inputs.map((input) => (
          <div key={input.id} className=''>
            <label htmlFor={input.id}>{input.label}: </label>
            <br />
            {input.type === 'number' ? (
              <div className='flex h-11 w-64'>
                <span className='inline-block border-l border-t border-b border-preto bg-cinzaClaro rounded-bl-2xl p-2'>
                  R$
                </span>
                <input
                  type={input.type}
                  id={input.id}
                  value={input.value}
                  onChange={(e) => handleInputChange(e, input.setter)}
                  className='border-r border-t border-b border-preto p-2 w-full rounded-r-2xl text-sm'
                />
                <div className='ml-2 mt-2'>{formatCurrency(input.value)}</div>
              </div>
            ) : (
              <input
                type={input.type}
                id={input.id}
                value={input.value}
                onChange={(e) => handleInputChange(e, input.setter)}
                className='border border-preto h-11 w-64 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
              />
            )}
          </div>
        ))}
      </div>
      <div className=' inline-block absolute bottom-0 right-0'>
        <button
          onClick={handleCalculate}
          disabled={calculando}
          className='bg-branco shadow-sm p-3 rounded-lg'
        >
          {calculando ? (
            'Calculando...'
          ) : (
            <div className=' text-azulEscuro'>
              <i>Calcular </i>
              <i className='fi fi-rr-arrow-small-right'></i>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

CalculationForm.propTypes = {
  title: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      setter: PropTypes.func.isRequired,
    }),
  ).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleCalculate: PropTypes.func.isRequired,
  calculando: PropTypes.bool.isRequired,
};

export default CalculationForm;
