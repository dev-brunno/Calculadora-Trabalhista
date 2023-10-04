import React from 'react';
import PropTypes from 'prop-types';

// Função auxiliar para formatar valores como moeda (R$)
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

// Componente CalculationForm que recebe várias propriedades para renderizar um formulário de cálculo
function CalculationForm({ title, inputs, handleInputChange, handleCalculate, calculando }) {
  return (
    <div className='border border-VerdeMedio dark:border-dark3 p-8 rounded-3xl'>
      {/* Renderiza os campos do formulário com base nos "inputs" passados */}
      {/* Renderiza o título do formulário */}
      <h2 className='text-2xl text-VerdeMedio dark:text-dark3'>{title}</h2>
      {/* Renderiza uma linha divisória */}
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5 dark:bg-dark3'></hr>
      {/* Renderiza os campos do formulário com base nas "inputs" passadas */}
      <div className='text-lg flex flex-col space-y-4'>
        {inputs.map((input) => (
          <div key={input.id} className=''>
            {/* Renderiza um rótulo para o campo */}
            <label className=' dark:text-white' htmlFor={input.id}>
              {input.label}:{' '}
            </label>
            <br />
            {/* Renderiza um campo de entrada com base no tipo de input */}
            {input.type === 'number' ? (
              <div className='flex h-11 w-64'>
                <span className='inline-block border-l border-t border-b border-preto dark:border-dark4 bg-cinzaClaro dark:bg-dark4 dark:text-white rounded-bl-2xl p-2'>
                  R$
                </span>
                <input
                  type={input.type}
                  id={input.id}
                  value={input.value}
                  onChange={(e) => handleInputChange(e, input.setter)}
                  className='border-r border-t border-b border-preto dark:border-dark4 p-2 w-full rounded-r-2xl text-sm'
                />
                <div className='ml-2 mt-2 dark:text-white'>{formatCurrency(input.value)}</div>
              </div>
            ) : input.type === 'select' ? (
              <select
                id={input.id}
                value={input.value}
                onChange={(e) => handleInputChange(e, input.setter)}
                className='border border-preto dark:border-dark4 h-11 w-64 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
              >
                {input.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              /* Renderiza um campo de entrada de texto padrão */
              <input
                type={input.type}
                id={input.id}
                value={input.value}
                onChange={(e) => handleInputChange(e, input.setter)}
                className='border border-preto dark:border-dark4 h-11 w-64 p-2 rounded-r-2xl rounded-bl-2xl text-sm'
              />
            )}
          </div>
        ))}
      </div>
      {/* Renderiza um botão de cálculo */}
      <div className=' inline-block absolute -bottom-14 right-0'>
        <button
          onClick={handleCalculate}
          disabled={calculando}
          className=' hover:text-azulEscuro p-2 h-12 rounded-lg dark:text-white dark:hover:text-dark3'
        >
          {calculando ? (
            'Calculando...'
          ) : (
            <div className=''>
              <i>Calcular </i>
              <i className='fi fi-rr-arrow-small-right'></i>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

// Especificação das propriedades esperadas pelo componente CalculationForm
CalculationForm.propTypes = {
  title: PropTypes.string.isRequired, // Título do formulário (obrigatório)
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Identificador do campo (obrigatório)
      label: PropTypes.string.isRequired, // Rótulo do campo (obrigatório)
      type: PropTypes.string.isRequired, // Tipo do campo (obrigatório)
      value: PropTypes.any.isRequired, // Valor do campo (obrigatório)
      setter: PropTypes.func.isRequired, // Função para atualizar o valor do campo (obrigatório)
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ), // Opções para campos de seleção (opcional)
    }),
  ).isRequired,
  handleInputChange: PropTypes.func.isRequired, // Função para lidar com a mudança nos campos (obrigatório)
  handleCalculate: PropTypes.func.isRequired, // Função para lidar com o cálculo (obrigatório)
  calculando: PropTypes.bool.isRequired, // Estado de cálculo (obrigatório)
};

export default CalculationForm;
