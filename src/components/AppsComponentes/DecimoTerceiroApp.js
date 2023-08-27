import React, { useState } from 'react';
import DecimoTerceiroCalculator from '../../Calculos/DecimoTerceiroCalculator';
import ResultadosDecimoTerceiro from '../Resultados/ResultadosDecimoTerceiro';

function DecimoTerceiroApp() {
  // Estados para armazenar as informações do formulário
  const [inicioContrato, setInicioContrato] = useState('2022-01-01');
  const [fimContrato, setFimContrato] = useState('2026-03-15');
  const [remuneracaoUltima, setRemuneracaoUltima] = useState(5000);

  // Estado para armazenar os resultados calculados
  const [resultados, setResultados] = useState([]);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);

  // Função para calcular o décimo terceiro
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

  // Função para limpar os resultados e erros
  const limparResultados = () => {
    setResultados([]);
    setErroCalculo(null);
  };

  // Renderização do componente
  return (
    <div className='DecimoTerceiroApp'>
      <h1>Calculadora de Décimo Terceiro</h1>
      <div>
        {/* Formulário para entrada de dados */}
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
      </div>
      <button onClick={calcularDecimoTerceiro} disabled={calculando}>
        {calculando ? 'Calculando...' : 'Calcular'}
      </button>
      {/* Exibe mensagem de erro, se houver */}
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
      {/* Exibição dos resultados usando o novo componente */}
      {resultados.length > 0 && <ResultadosDecimoTerceiro resultados={resultados} />}
    </div>
  );
}

export default DecimoTerceiroApp;
