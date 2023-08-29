import React, { useState } from 'react';
import CalculationForm from '../InterfaceComponents/CalculationForm'; // Importe o componente CalculationForm
import CalculationResult from '../InterfaceComponents/CalculationResult';
import FGTSCalculator from '../../Calculos/FGTSCalculator';

function FGTSApp() {
  const [salarioMensal, setSalarioMensal] = useState(3000);
  const [valorFGTS, setValorFGTS] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const handleInputChange = (event, setter) => {
    setValorFGTS(null);
    setter(event.target.value);
  };

  const handleCalculate = async () => {
    setCalculando(true);
    setErroCalculo(null);
    try {
      const fgtsCalculator = new FGTSCalculator(salarioMensal);
      const calculatedFGTS = fgtsCalculator.calcularFGTS();
      setValorFGTS(calculatedFGTS);
      setMostrarResultados(true);
    } catch (error) {
      setErroCalculo('Erro ao calcular o FGTS. Verifique o valor e tente novamente.');
    } finally {
      setCalculando(false);
    }
  };

  const handleRefazerCalculo = () => {
    setMostrarResultados(false);
    setValorFGTS(null);
  };

  const inputs = [
    {
      id: 'salarioMensal',
      label: 'Salário Mensal',
      type: 'number',
      value: salarioMensal,
      setter: setSalarioMensal,
    },
  ];

  const renderFGTSResult = (valor) => (
    <div>
      <strong>Valor do FGTS:</strong> R${' '}
      {valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
      })}
    </div>
  );

  return (
    <div>
      {mostrarResultados ? (
        <div>
          <CalculationResult
            title='Resultado do FGTS'
            results={[valorFGTS]}
            renderResult={renderFGTSResult}
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
          title='Cálulo do FGTS'
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

export default FGTSApp;
