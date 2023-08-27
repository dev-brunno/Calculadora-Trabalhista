import React, { useState } from 'react';
import DecimoTerceiroCalculator from '../../Calculos/DecimoTerceiroCalculator';
import ResultadosDecimoTerceiro from '../Resultados/ResultadosDecimoTerceiro';

function DecimoTerceiroApp() {
  const [inicioContrato, setInicioContrato] = useState('2022-01-01');
  const [fimContrato, setFimContrato] = useState('2026-03-15');
  const [remuneracaoUltima, setRemuneracaoUltima] = useState(5000);

  const [resultados, setResultados] = useState([]);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);

  const calcularDecimoTerceiro = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const calculator = new DecimoTerceiroCalculator(
        inicioContrato,
        fimContrato,
        remuneracaoUltima,
      );
      const resultadosCalculados = await calculator.calcularDecimoTerceiro();
      setResultados(resultadosCalculados);
    } catch (error) {
      setErroCalculo('Erro ao calcular o décimo terceiro. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const limparResultados = () => {
    setResultados([]);
    setErroCalculo(null);
  };

  return (
    <div className='DecimoTerceiroApp'>
      <h1>Calculadora de Décimo Terceiro</h1>
      {resultados.length === 0 ? (
        <div>
          <label>Data de Início do Contrato: </label>
          <input
            type='date'
            value={inicioContrato}
            onChange={(e) => {
              limparResultados();
              setInicioContrato(e.target.value);
            }}
          />
          <br />
          <label>Data de Término do Contrato: </label>
          <input
            type='date'
            value={fimContrato}
            min={inicioContrato}
            onChange={(e) => {
              limparResultados();
              setFimContrato(e.target.value);
            }}
          />
          <br />
          <label>Remuneração da Última Parcela: </label>
          <input
            type='number'
            value={remuneracaoUltima}
            onChange={(e) => {
              limparResultados();
              setRemuneracaoUltima(parseFloat(e.target.value));
            }}
          />
          <br />
          <button onClick={calcularDecimoTerceiro} disabled={calculando}>
            {calculando ? 'Calculando...' : 'Calcular'}
          </button>
          {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
        </div>
      ) : (
        <div>
          <ResultadosDecimoTerceiro resultados={resultados} />
          <button onClick={limparResultados}>Refazer Cálculo</button>
        </div>
      )}
    </div>
  );
}

export default DecimoTerceiroApp;
