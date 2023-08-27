import React, { useState } from 'react';
import InsalubridadeCalculator from '../../Calculos/InsalubridadeCalculator';
import ResultadosInsalubridade from '../Resultados/ResultadosInsalubridade';

function InsalubridadeApp() {
  const [salarioBase, setSalarioBase] = useState(2000);
  const [grauInsalubridade, setGrauInsalubridade] = useState('10');
  const [valorInsalubridade, setValorInsalubridade] = useState(null);

  const handleCalculate = () => {
    try {
      const insalubridadeCalculator = new InsalubridadeCalculator(salarioBase, grauInsalubridade);
      const calculatedInsalubridade = insalubridadeCalculator.calcularInsalubridade();
      setValorInsalubridade(calculatedInsalubridade);
    } catch (error) {
      console.error('Erro ao calcular insalubridade:', error);
      setValorInsalubridade(null); // Limpa os resultados em caso de erro
    }
  };

  const handleSalarioBaseChange = (e) => {
    setValorInsalubridade(null); // Limpa os resultados ao alterar campos
    setSalarioBase(e.target.value);
  };

  const handleGrauInsalubridadeChange = (e) => {
    setValorInsalubridade(null); // Limpa os resultados ao alterar campos
    setGrauInsalubridade(e.target.value);
  };

  return (
    <div>
      <h1>Calculadora de Insalubridade</h1>
      <div>
        <label htmlFor='salarioBase'>Salário Base: </label>
        <input
          type='number'
          id='salarioBase'
          value={salarioBase}
          min='0'
          step='100'
          onChange={handleSalarioBaseChange}
        />
      </div>
      <div>
        <label htmlFor='grauInsalubridade'>Grau de Insalubridade: </label>
        <select
          id='grauInsalubridade'
          value={grauInsalubridade}
          onChange={handleGrauInsalubridadeChange}
        >
          <option value='10'>Grau Mínimo (10%)</option>
          <option value='20'>Grau Médio (20%)</option>
          <option value='40'>Grau Máximo (40%)</option>
        </select>
      </div>
      <button onClick={handleCalculate}>Calcular</button>
      {valorInsalubridade !== null && (
        <ResultadosInsalubridade valorInsalubridade={valorInsalubridade} />
      )}
    </div>
  );
}

export default InsalubridadeApp;
