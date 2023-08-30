import React, { useState } from 'react';
import CalculationForm from '../InterfaceComponents/CalculationForm.component';
import CalculationResult from '../InterfaceComponents/CalculationResult.component';
import { FeriasIndenizatoriasCalculator } from '../../Calculos/FeriasCalculator';

function FeriasApp() {
  const [inicioContrato, setInicioContrato] = useState('2022-01-01');
  const [fimContrato, setFimContrato] = useState('2024-09-30');
  const [remuneracao, setRemuneracao] = useState(1200);
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
      const calculator = new FeriasIndenizatoriasCalculator(
        inicioContrato,
        fimContrato,
        remuneracao,
      );
      const calculatedResults = await calculator.calcular();
      setResultados(calculatedResults);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular férias. Verifique os valores e tente novamente.');
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
      id: 'remuneracao',
      label: 'Remuneração da Última Férias',
      type: 'number',
      value: remuneracao,
      setter: setRemuneracao,
    },
  ];

  const renderFeriasResult = (result) => (
    <div>
      <strong>Período:</strong> {result.periodo}
      <br />
      <strong>Férias:</strong> R${' '}
      {result.ferias.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}
      <br />
      <strong>Terço Constitucional:</strong> R${' '}
      {result.tercoConstitucional.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}
      <br />
      {result.feriasIndenizatorias !== undefined && (
        <div>
          <strong>Férias Indenizatórias:</strong> R${' '}
          {result.feriasIndenizatorias.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
          <br />
        </div>
      )}
      {result.feriasProporcionais !== undefined && (
        <div>
          <strong>Férias Proporcionais:</strong> R${' '}
          {result.feriasProporcionais.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
          <br />
        </div>
      )}
    </div>
  );

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult
            title='Resultados de Férias'
            results={resultados}
            renderResult={renderFeriasResult}
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
          title='Cálculo de Férias'
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

export default FeriasApp;
