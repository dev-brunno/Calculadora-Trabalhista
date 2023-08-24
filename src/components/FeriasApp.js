import React, { useState } from 'react';
import { FeriasIndenizatoriasCalculator } from '../Calculos/FeriasCalculator';
import ResultadosFerias from './Resultados/ResultadosFerias';

function FeriasApp() {
  const [inicioContrato, setInicioContrato] = useState('2022-01-01');
  const [fimContrato, setFimContrato] = useState('2024-09-30');
  const [remuneracao, setRemuneracao] = useState(1200);
  const [resultados, setResultados] = useState([]);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null); // Estado para tratar erros

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null); // Limpa o erro anterior
    try {
      const calculator = new FeriasIndenizatoriasCalculator(
        inicioContrato,
        fimContrato,
        remuneracao,
      );
      const calculatedResults = await calculator.calcular();
      setResultados(calculatedResults);
    } catch (error) {
      setErroCalculo('Erro ao calcular férias. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleInputChange = (event, setter) => {
    setResultados([]); // Limpa os resultados ao alterar campos
    setter(event.target.value);
  };

  return (
    <div>
      <h1>Calculadora de Férias</h1>
      <div>
        <label htmlFor='inicioContrato'>Data de Início do Contrato: </label>
        <input
          type='date'
          id='inicioContrato'
          value={inicioContrato}
          onChange={(e) => handleInputChange(e, setInicioContrato)}
        />
      </div>
      <div>
        <label htmlFor='fimContrato'>Data de Término do Contrato: </label>
        <input
          type='date'
          id='fimContrato'
          value={fimContrato}
          onChange={(e) => handleInputChange(e, setFimContrato)}
        />
      </div>
      <div>
        <label htmlFor='remuneracao'>Remuneração da Última Férias: </label>
        <input
          type='number'
          id='remuneracao'
          value={remuneracao}
          min='0'
          step='100'
          onChange={(e) => handleInputChange(e, setRemuneracao)}
        />
      </div>
      <button onClick={handleCalculate} disabled={calculando}>
        {calculando ? 'Calculando...' : 'Calcular'}
      </button>
      {/* Exibe mensagem de erro, se houver */}
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
      {/* Exibe os resultados */}
      {resultados.length > 0 && <ResultadosFerias resultados={resultados} />}
    </div>
  );
}

export default FeriasApp;
