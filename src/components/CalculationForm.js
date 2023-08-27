import React from 'react';
import PropTypes from 'prop-types';

function CalculationForm({ inputs, handleInputChange, handleCalculate, calculando }) {
  return (
    <div>
      {/* Renderize os campos do formulário com base nos "inputs" passados */}
      {inputs.map((input) => (
        <div key={input.id}>
          <label htmlFor={input.id}>{input.label}: </label>
          <input
            type={input.type}
            id={input.id}
            value={input.value}
            onChange={(e) => handleInputChange(e, input.setter)}
          />
        </div>
      ))}
      <button onClick={handleCalculate} disabled={calculando}>
        {calculando ? 'Calculando...' : 'Calcular'}
      </button>
    </div>
  );
}

CalculationForm.propTypes = {
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
