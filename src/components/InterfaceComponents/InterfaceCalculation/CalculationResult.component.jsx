import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useClientes } from '../../../Context/ClientesContext';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc, // Importe a função updateDoc
} from 'firebase/firestore'; // Importe as funções necessárias do Firebase Firestore

function CalculationResult({ title, results, renderResult }) {
  const { clientes } = useClientes();
  const [mostrarCaixaSelecao, setMostrarCaixaSelecao] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const handleLinkToClient = () => {
    // Mostrar a caixa de seleção quando o botão for clicado
    setMostrarCaixaSelecao(true);
  };

  const handleClienteSelecionado = async (clienteId) => {
    // Salvar o cliente selecionado
    setClienteSelecionado(clienteId);
    // Ocultar a caixa de seleção
    setMostrarCaixaSelecao(false);

    // Verificar se há resultados a serem salvos
    if (results.length > 0 && clienteSelecionado !== null) {
      const db = getFirestore(); // Remova 'app' aqui, pois 'getFirestore' não precisa disso
      const clientesCollection = collection(db, 'clientes');
      const clienteDoc = doc(clientesCollection, clienteSelecionado);

      try {
        // Obtenha os resultados atuais do cliente, se houver
        const clienteSnapshot = await getDoc(clienteDoc);
        const clienteData = clienteSnapshot.data();

        // Crie um objeto que contém os resultados dos cálculos
        const novosResultadosCalculos = {
          ...clienteData.ResultadosCalculos,
          [title]: results, // Use o título como chave para os resultados
        };

        // Atualize o campo "ResultadosCalculos" no documento do cliente
        await updateDoc(clienteDoc, {
          ResultadosCalculos: novosResultadosCalculos,
        });

        console.log('Resultados salvos com sucesso no Firebase.');

        // Lembre-se de atualizar a interface ou o estado do seu aplicativo conforme necessário.
      } catch (error) {
        console.error('Erro ao salvar resultados:', error);
      }
    }
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

      {/* Mostrar a caixa de seleção de clientes se o estado mostrarCaixaSelecao for verdadeiro */}
      {mostrarCaixaSelecao && (
        <div className='caixa-de-selecao'>
          <h3>Selecione um Cliente:</h3>
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.id} onClick={() => handleClienteSelecionado(cliente.id)}>
                {cliente.nome} {/* Ou qualquer outra informação que identifique o cliente */}
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
