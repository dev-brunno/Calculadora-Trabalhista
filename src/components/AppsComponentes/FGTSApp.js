import React, { useState } from 'react';
import FGTSCalculator from '../../Calculos/FGTSCalculator'; // Importe a classe FGTSCalculator
import ResultadosFGTS from '../Resultados/ResultadosFGTS'; // Importe o componente para mostrar os resultados

function FGTSApp() {
  const [salarioMensal, setSalarioMensal] = useState(3000); // Valor padrão de exemplo
  const [valorFGTS, setValorFGTS] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const fgtsCalculator = new FGTSCalculator(salarioMensal);
      const calculatedFGTS = fgtsCalculator.calcularFGTS();
      setValorFGTS(calculatedFGTS);
    } catch (error) {
      setErroCalculo('Erro ao calcular o FGTS. Verifique o valor e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleInputChange = (event) => {
    setValorFGTS(null);
    setSalarioMensal(event.target.value);
  };

  return (
    <div>
      <h1>Calculadora de FGTS</h1>
      <div>
        <label htmlFor='salarioMensal'>Salário Mensal: </label>
        <input
          type='number'
          id='salarioMensal'
          value={salarioMensal}
          min='0'
          step='100'
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleCalculate} disabled={calculando}>
        {calculando ? 'Calculando...' : 'Calcular'}
      </button>
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
      {valorFGTS !== null && <ResultadosFGTS valorFGTS={valorFGTS} />}
    </div>
  );
}

export default FGTSApp;
