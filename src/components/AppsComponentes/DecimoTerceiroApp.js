import React, { useState } from 'react';
import CalculationForm from '../InterfaceComponents/CalculationForm.component';
import CalculationResult from '../InterfaceComponents/CalculationResult.component';
import DecimoTerceiroCalculator from '../../Calculos/DecimoTerceiroCalculator';

function DecimoTerceiroApp() {
  const [inicioContrato, setInicioContrato] = useState('2022-01-01');
  const [fimContrato, setFimContrato] = useState('2026-03-15');
  const [remuneracaoUltima, setRemuneracaoUltima] = useState('5000');
  const [resultados, setResultados] = useState([]);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setResultados([]);
    setter(event.target.value);
  };

  const handleCalculate = async () => {
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
      setMostrarResultados(true); // Mostra os resultados após o cálculo
    } catch (error) {
      setErroCalculo('Erro ao calcular o décimo terceiro. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setResultados([]);
  };

  const inputs = [
    {
      id: 'inicioContrato',
      label: 'Data de Início do Contrato',
      type: 'date',
      value: inicioContrato,
      setter: setInicioContrato,
    },
    {
      id: 'fimContrato',
      label: 'Data de Término do Contrato',
      type: 'date',
      value: fimContrato,
      setter: setFimContrato,
    },
    {
      id: 'remuneracaoUltima',
      label: 'Remuneração da Última Parcela',
      type: 'number',
      value: remuneracaoUltima,
      setter: setRemuneracaoUltima,
    },
  ];

  const renderDecimoTerceiroResult = (result) => (
    <div>
      <strong>Ano Correspondente:</strong> {result.anoCorrespondente}
      <br />
      <strong>Período:</strong> {result.periodo}
      <br />
      <strong>Valor do Décimo Terceiro:</strong> R${' '}
      {result.valorDecimoTerceiro.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}
    </div>
  );

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult
            title='Resultados do Décimo Terceiro'
            results={resultados}
            renderResult={renderDecimoTerceiroResult}
          />
          <div className=' inline-block absolute bottom-0 right-0'>
            <button onClick={handleRefazerCalculo} className='bg-branco shadow-sm p-3 rounded-lg'>
              <div className=' text-azulEscuro'>
                <i>Refazer Cálculo </i>
                <i className='fi fi-rr-arrow-small-right'></i>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <CalculationForm
          title='Cálculo de Décimo Terceiro'
          inputs={inputs}
          handleInputChange={handleInputChange}
          handleCalculate={handleCalculate}
          calculando={calculando}
        />
      )}
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
    </div>
  );
}

export default DecimoTerceiroApp;
