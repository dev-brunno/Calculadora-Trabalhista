import React, { useState } from 'react';
import PericulosidadeCalculator from '../../Calculos/PericulosidadeCalculator';
import ResultadosPericulosidade from '../Resultados/ResultadosPericulosidade';

function PericulosidadeApp() {
  const [salarioBase, setSalarioBase] = useState(2000);
  const [valorPericulosidade, setValorPericulosidade] = useState(null);

  const handleCalculate = () => {
    try {
      const periculosidadeCalculator = new PericulosidadeCalculator(salarioBase);
      const calculatedPericulosidade = periculosidadeCalculator.calcularPericulosidade();
      setValorPericulosidade(calculatedPericulosidade);
    } catch (error) {
      console.error('Erro ao calcular periculosidade:', error);
    }
  };

  const handleSalarioBaseChange = (e) => {
    setValorPericulosidade(null); // Limpa os resultados ao alterar campos
    setSalarioBase(e.target.value);
  };

  return (
    <div>
      <h1>Calculadora de Periculosidade</h1>
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
      <button onClick={handleCalculate}>Calcular</button>
      {valorPericulosidade !== null && (
        <ResultadosPericulosidade valorPericulosidade={valorPericulosidade} />
      )}
    </div>
  );
}

export default PericulosidadeApp;
