import React, { useState, useEffect } from 'react';
import { CalcDesTerceiro } from '../Calculos/calcDesTerceiro';

function CalculadoraDesTerceiro() {
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [mesesTrabalhados, setMesesTrabalhados] = useState(0);
  const [adicionais, setAdicionais] = useState([
    { nome: 'Periculosidade', valor: false },
    { nome: 'Insalubridade', valor: false },
    { nome: 'Extra', valor: false },
  ]);
  const [grauExposicao, setGrauExposicao] = useState('mínimo');
  const [outrosAdicionais, setOutrosAdicionais] = useState(0);
  const [calcularClicado, setCalcularClicado] = useState(false);
  const [valorCalculadoExibicao, setValorCalculadoExibicao] = useState('');

  function calcularValorTotal() {
    const parametrosCalculadora = {
      salarioBruto,
      mesesTrabalhados,
      adicionais,
      grauExposicao,
      outrosAdicionais,
    };

    const calculadoraComAdicionais = new CalcDesTerceiro(parametrosCalculadora);
    return calculadoraComAdicionais.calcularValorTotal();
  }

  useEffect(() => {
    if (calcularClicado) {
      const valorTotalComAdicionais = calcularValorTotal();
      setValorCalculadoExibicao(valorTotalComAdicionais.toFixed(2));
      setCalcularClicado(false);
    }
  }, [calcularClicado]);

  return (
    <div className='App'>
      <h1>Calculadora de Décimo Terceiro Salário</h1>
      <div>
        <label>Salário Bruto:</label>
        <input
          type='number'
          value={salarioBruto}
          onChange={(e) => setSalarioBruto(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Meses Trabalhados:</label>
        <input
          type='number'
          value={mesesTrabalhados}
          onChange={(e) => setMesesTrabalhados(parseInt(e.target.value))}
        />
      </div>
      {adicionais.map((adicional, index) => (
        <div key={index}>
          <label>{`Incluir Adicional de ${adicional.nome}:`}</label>
          <input
            type='checkbox'
            checked={adicional.valor}
            onChange={(e) => {
              const novosAdicionais = [...adicionais];
              novosAdicionais[index].valor = e.target.checked;
              setAdicionais(novosAdicionais);
            }}
          />
        </div>
      ))}
      {/* Renderizar Grau de Exposição somente quando Insalubridade for marcado */}
      {adicionais[1].valor && (
        <div>
          <label>Grau de Exposição:</label>
          <select value={grauExposicao} onChange={(e) => setGrauExposicao(e.target.value)}>
            <option value='mínimo'>Mínimo</option>
            <option value='médio'>Médio</option>
            <option value='máximo'>Máximo</option>
          </select>
        </div>
      )}
      {/* Renderizar Outros Adicionais somente quando Incluir Adicional de Extra for marcado */}
      {adicionais[2].valor && (
        <div>
          <label>Outros Adicionais:</label>
          <input
            type='number'
            value={outrosAdicionais}
            onChange={(e) => setOutrosAdicionais(parseFloat(e.target.value))}
          />
        </div>
      )}
      <div>
        <button
          onClick={() => {
            setCalcularClicado(true);
          }}
        >
          Calcular
        </button>
      </div>
      <div>{valorCalculadoExibicao && <h2>Valor total: R${valorCalculadoExibicao}</h2>}</div>
    </div>
  );
}

export default CalculadoraDesTerceiro;
