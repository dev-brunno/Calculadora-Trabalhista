import React, { useState } from 'react';
import TransferenciaCalculator from '../../Calculos/TransferenciaCalculator';
import ResultadosTransferencia from '../Resultados/ResultadosTransferencia';

function TransferenciaApp() {
  const [remuneracao, setRemuneracao] = useState(2000);
  const [porcentagem, setPorcentagem] = useState(10);
  const [valorTransferencia, setValorTransferencia] = useState(null);

  const handleCalculate = () => {
    try {
      const transferenciaCalculator = new TransferenciaCalculator(remuneracao, porcentagem);
      const calculatedTransferencia = transferenciaCalculator.calcularTransferencia();
      setValorTransferencia(calculatedTransferencia);
    } catch (error) {
      console.error('Erro ao calcular transferência:', error);
      setValorTransferencia(null); // Limpa os resultados em caso de erro
    }
  };

  const handleRemuneracaoChange = (e) => {
    setValorTransferencia(null); // Limpa os resultados ao alterar campos
    setRemuneracao(e.target.value);
  };

  const handlePorcentagemChange = (e) => {
    setValorTransferencia(null); // Limpa os resultados ao alterar campos
    setPorcentagem(e.target.value);
  };

  return (
    <div>
      <h1>Calculadora de Transferência</h1>
      <div>
        <label htmlFor='remuneracao'>Remuneração: </label>
        <input
          type='number'
          id='remuneracao'
          value={remuneracao}
          min='0'
          step='100'
          onChange={handleRemuneracaoChange}
        />
      </div>
      <div>
        <label htmlFor='porcentagem'>Porcentagem: </label>
        <input
          type='number'
          id='porcentagem'
          value={porcentagem}
          min='0'
          step='1'
          onChange={handlePorcentagemChange}
        />
      </div>
      <button onClick={handleCalculate}>Calcular</button>
      {valorTransferencia !== null && (
        <ResultadosTransferencia valorTransferencia={valorTransferencia} />
      )}
    </div>
  );
}

export default TransferenciaApp;
