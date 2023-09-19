import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useClientes } from '../../../Context/ClientesContext';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

function CalculationResult({ title, results, icon }) {
  const { clientes } = useClientes();
  const [mostrarCaixaSelecao, setMostrarCaixaSelecao] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  useEffect(() => {
    // Verifique se há resultados a serem salvos e cliente selecionado
    if (results.length > 0 && clienteSelecionado !== null) {
      const saveResults = async () => {
        const db = getFirestore();
        const clientesCollection = collection(db, 'clientes');
        const clienteDoc = doc(clientesCollection, clienteSelecionado);

        try {
          const clienteSnapshot = await getDoc(clienteDoc);
          const clienteData = clienteSnapshot.data();

          const novosResultadosCalculos = {
            ...clienteData.ResultadosCalculos,
            [title]: results,
          };

          await updateDoc(clienteDoc, {
            ResultadosCalculos: novosResultadosCalculos,
          });

          console.log('Resultados salvos com sucesso no Firebase.');
        } catch (error) {
          console.error('Erro ao salvar resultados:', error);
        }
      };

      // Chame a função para salvar os resultados quando o estado for atualizado
      saveResults();
    }
  }, [clienteSelecionado, results, title]);

  const handleLinkToClient = () => {
    setMostrarCaixaSelecao(true);
  };

  const handleClienteSelecionado = (clienteId) => {
    setClienteSelecionado(clienteId);
    setMostrarCaixaSelecao(false);
  };

  // function formatCurrency(value) {
  //   return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  // }

  // Função para renderizar resultados de forma genérica
  const renderResultItem = (item) => {
    if (typeof item === 'object') {
      return Object.entries(item).map(([key, value], subIndex) => (
        <div className='text-sm flex w-100 justify-between' key={subIndex}>
          <div>{key}</div>
          <div>{value}</div>
        </div>
      ));
    } else {
      return <div>{item}</div>;
    }
  };

  const lastIndex = results.length - 1;

  return (
    <div>
      <h2 className='text-2xl text-VerdeMedio'>{title}</h2>
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
      <div className=' flex'>
        <div className=' grid justify-items-center p-4 w-1/2'>
          <div className='grid gap-negativo justify-items-center text-azulEscuro'>
            <div className=' text-3xl'>
              <i className={icon['icon']}></i>
            </div>
            <span>{icon['title']}</span>
          </div>
          <div className='text-azulEscuro font-bold text-5xl flex'>
            <h2>
              <span className=' text-2xl'>R$</span>
              {results[lastIndex]['Valor a receber'].toLocaleString('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>
        <div className='w-1/2 p-4'>
          <div>
            <div className='flex items-center justify-between'>
              <div className=''>
                <h3 className=' font-medium'>Vincular a um cliente</h3>
                <h6 className=' font-light text-sm'>
                  Armazene esse cálculo a um cliente cadastrado
                </h6>
              </div>
              <button className=' text-3xl' onClick={handleLinkToClient}>
                <i className='fi fi-sr-angle-square-right'></i>
              </button>
            </div>
            <hr className=' h-0.1 border-0 rounded bg-preto mt-1 mb-5'></hr>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <div className=''>
                <h3 className=' font-medium'>Gerar relatórios</h3>
                <h6 className=' font-light text-sm'>Gerar PDF, planilhas e impressões</h6>
              </div>
              <button className=' text-3xl'>
                <i className='fi fi-sr-angle-square-right'></i>
              </button>
            </div>
            <hr className=' h-0.1 border-0 rounded bg-preto mt-1 mb-5'></hr>
          </div>
        </div>
      </div>
      <div className='bg-azulClaro p-8 bg-opacity-40 rounded-3xl'>
        <h6 className=' font-bold text-VerdeEscuro text-sm'>Ganhos do Cliente:</h6>
        <ul className='grid gap-2 grid-rows-1'>
          {results.map((result, index) => (
            <li key={index} className=''>
              {Array.isArray(result) ? (
                result.map((item, itemIndex) => (
                  <div className='grid grid-cols-1 divide-y ' key={itemIndex}>
                    {renderResultItem(item)}
                  </div>
                ))
              ) : (
                <div className='grid grid-cols-1 divide-y divide-gray-300'>
                  {renderResultItem(result)}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {mostrarCaixaSelecao && (
        <div className='caixa-de-selecao'>
          <h3>Selecione um Cliente:</h3>
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.id} onClick={() => handleClienteSelecionado(cliente.id)}>
                {cliente.nome}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

CalculationResult.propTypes = {
  title: PropTypes.string.isRequired, // Alterado para string
  results: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.any]).isRequired,
  icon: PropTypes.object.isRequired, // Alterado para objeto
};

export default CalculationResult;
