import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useClientes } from '../../../Context/ClientesContext';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

function CalculationResult({ title, results, renderResult }) {
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

  return (
    <div>
      <h2 className='text-2xl text-VerdeMedio'>{title}</h2>
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio mt-1 mb-5'></hr>
      <div className='bg-azulClaro p-8 bg-opacity-40 rounded-2xl'>
        <h4 className='text-VerdeEscuro'>
          <strong>Ganhos do Cliente:</strong>
        </h4>
        <ul className='grid gap-2 grid-cols-2'>
          {results.map((result, index) => (
            <li key={index} className='bg-azulEscuro bg-opacity-40 p-2 mt-2 rounded-2xl'>
              {Array.isArray(result) // Verifica se é um array
                ? result.map((item, itemIndex) => <div key={itemIndex}>{renderResult(item)}</div>)
                : renderResult(result)}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleLinkToClient}>Vincular a um Cliente Existente</button>

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
  title: PropTypes.string.isRequired,
  results: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]).isRequired,
  renderResult: PropTypes.func.isRequired,
};

export default CalculationResult;
