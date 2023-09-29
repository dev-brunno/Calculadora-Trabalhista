import React, { useState } from 'react';
import CalculationForm from '../../InterfaceComponents/InterfaceCalculation/CalculationForm.component';
import CalculationResult from '../../InterfaceComponents/InterfaceCalculation/CalculationResult.component';
import DecimoTerceiroCalculator from '../../../Classes/Calculos/DecimoTerceiroCalculator';
import RefazerCalculoButton from '../../InterfaceComponents/InterfaceCalculation/RefazerCalculoButton.compoent';

function DecimoTerceiroApp() {
  // Definindo estados iniciais para as variáveis
  const [inicioContrato, setInicioContrato] = useState('2022-01-01');
  const [fimContrato, setFimContrato] = useState('2026-03-15');
  const [remuneracaoUltima, setRemuneracaoUltima] = useState('5000');
  const [resultados, setResultados] = useState([]);
  const [calculando, setCalculando] = useState(false);
  const [erroCalculo, setErroCalculo] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Função para lidar com a mudança nos campos de entrada
  const handleInputChange = (event, setter) => {
    setResultados([]);
    setter(event.target.value);
  };

  // Função para calcular o décimo terceiro
  const handleCalculate = async () => {
    setCalculando(true); // Define o estado de cálculo como ativo
    setErroCalculo(null); // Limpa qualquer erro de cálculo anterior
    try {
      // Cria uma instância do calculador de décimo terceiro e realiza o cálculo
      const calculator = new DecimoTerceiroCalculator(
        inicioContrato,
        fimContrato,
        remuneracaoUltima,
      );
      const resultadosCalculados = await calculator.calcularDecimoTerceiro();
      setResultados(resultadosCalculados); // Define os resultados do cálculo
      setMostrarResultados(true); // Mostra os resultados após o cálculo
    } catch (error) {
      setErroCalculo('Erro ao calcular o décimo terceiro. Verifique os valores e tente novamente.');
    } finally {
      setCalculando(false); // Define o estado de cálculo como inativo, independentemente do resultado
    }
  };

  // Função para refazer o cálculo
  const handleRefazerCalculo = () => {
    setMostrarResultados(false); // Oculta os resultados
    setResultados([]); // Limpa os resultados
  };

  // Definindo os campos de entrada e seus valores iniciais
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

  // Ícone para os resultados do cálculo
  const icon = {
    title: 'Décimo Terceiro',
    icon: 'fi fi-rr-calendar',
  };

  return (
    <div>
      {mostrarResultados ? (
        <div>
          {/* Componente CalculationResult para exibir os resultados do cálculo */}
          <CalculationResult title='Décimo Terceiro' results={resultados} icon={icon} />
          {/* Componente RefazerCalculoButton para permitir refazer o cálculo */}
          <RefazerCalculoButton onClick={handleRefazerCalculo} />
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
      {/* Exibe uma mensagem de erro, se houver */}
      {erroCalculo && <p style={{ color: 'red' }}>{erroCalculo}</p>}
    </div>
  );
}

export default DecimoTerceiroApp;
