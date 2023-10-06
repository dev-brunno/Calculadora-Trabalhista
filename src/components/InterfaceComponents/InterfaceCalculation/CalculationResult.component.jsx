import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import PropTypes from 'prop-types';
import { useClientes } from '../../../Context/ClientesContext';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import SelecaoClienteBox from './SelecaoClienteBox.component';
import ReportPDF from './ReportPDF.component';
import OpenInNewTabButton from './OpenInNewTabButton.component';
import FormataRealBrasileiro from '../../../Classes/Calculos/FormataRealBrasileiro';
import { useAuth } from '../../../Context/AuthProvider';
import firebase from '../../../Firebase/firebase';

function CalculationResult({ title, results, icon }) {
  const { clientes } = useClientes();
  const [mostrarCaixaSelecao, setMostrarCaixaSelecao] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [userData, setUserData] = useState({}); // Estado para armazenar os dados do usuário

  const { user } = useAuth();

  useEffect(() => {
    // Verifica se há resultados a serem salvos e cliente selecionado
    if (results.length > 0 && clienteSelecionado !== null) {
      const saveResults = async () => {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        const userClientesCollection = collection(userDocRef, 'clientes');
        const clienteDoc = doc(userClientesCollection, clienteSelecionado);

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

          setMostrarAviso(true);
          console.log('Resultados salvos com sucesso no Firebase.');
        } catch (error) {
          console.error('Erro ao salvar resultados:', error);
        }
      };

      // Chame a função para salvar os resultados quando o estado for atualizado
      saveResults();
    }
  }, [clienteSelecionado, results, title, user]);

  // Efeito para buscar os dados do usuário
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = firebase.firestore().collection('users').doc(user.uid);
          const userDocSnapshot = await userDocRef.get();

          if (userDocSnapshot.exists) {
            const userDataFromFirestore = userDocSnapshot.data();
            setUserData(userDataFromFirestore);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleLinkToClient = () => {
    setMostrarCaixaSelecao(true);
  };

  const handleClienteSelecionado = (clienteId) => {
    setClienteSelecionado(clienteId);
    setMostrarCaixaSelecao(false);
  };

  const handleCloseCaixaSelecao = () => {
    setMostrarCaixaSelecao(false);
  };

  // Função para renderizar resultados de forma genérica
  const renderResultItem = (item) => {
    if (typeof item === 'object') {
      return Object.entries(item).map(([key, value], subIndex) => (
        <div key={subIndex}>
          {key === 'Descontos' ? (
            // Se a chave for "Descontos", cria uma div com um título h6
            <div>
              <h6 className='font-bold text-red-600 dark:text-red-400 mt-2 mb-2'>Descontos:</h6>
              <div className='text-sm flex md:w-100 justify-between'>
                <div>{key}</div>
                <div>{typeof value === 'number' ? FormataRealBrasileiro(value) : value}</div>
              </div>
              <hr className='h-0.1 border-0 rounded bg-gray-300 dark:bg-purple-800 mb-5'></hr>
            </div>
          ) : (
            // Se não for "Descontos", crie apenas os elementos normais
            <div>
              <div
                className={`text-sm flex md:w-100 justify-between ${
                  key === 'Período' ? 'font-bold' : ''
                } ${
                  key === 'Valor a Receber'
                    ? ' font-bold bg-VerdeEscuro text-branco p-2 mt-3 rounded-md'
                    : ''
                }`}
              >
                <div>{key}</div>
                <div>{typeof value === 'number' ? FormataRealBrasileiro(value) : value}</div>
              </div>
              <hr className='h-0.1 border-0 rounded bg-gray-300 dark:bg-purple-800'></hr>
            </div>
          )}
        </div>
      ));
    } else {
      return <div>{item}</div>;
    }
  };

  const lastIndex = results.length - 1;

  const handleOpenNewTab = (novaAba) => {
    const root = createRoot(novaAba.document.getElementById('report-pdf-container'));

    const resultsPDF = {
      [title]: results,
    };

    const userInfo = {
      Advogado: userData.displayName,
      Telefone: userData.phoneNumber,
      'E-mail': userData.email,
      Oab: userData.oabNumber,
    };

    root.render(
      <React.StrictMode>
        <ReportPDF
          title={'Cálculos de Benefícios Trabalhistas'}
          calculationResults={resultsPDF}
          userData={userInfo}
        />
      </React.StrictMode>,
    );
  };

  return (
    <div>
      <h2 className='text-2xl text-VerdeMedio dark:text-dark3'>{title}</h2>
      <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio dark:bg-dark3 mt-1 mb-5'></hr>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/2 flex flex-col justify-center'>
          <div className='text-azulEscuro dark:text-white'>
            <div className='text-3xl grid justify-items-center'>
              <i className={icon['icon']}></i>
            </div>
            <div className='-mt-1 grid justify-items-center'>
              <h6>{icon['title']}</h6>
            </div>
          </div>
          <div className='text-azulEscuro dark:text-white font-bold text-5xl flex justify-center'>
            <h2>
              <span className=' text-2xl'>R$</span>
              {results[lastIndex]['Valor a Receber'].toLocaleString('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>
        <div className='md:w-1/2 p-4 dark:text-white'>
          <div>
            <div className='flex items-center justify-between'>
              <div className=''>
                <h3 className=' font-medium'>Vincular a um cliente</h3>
                <h6 className=' font-light text-sm'>
                  Armazene esse cálculo a um cliente cadastrado
                </h6>
              </div>
              <button
                className=' text-3xl text-azulEscuro dark:text-dark3 hover:text-black dark:hover:text-dark2'
                onClick={handleLinkToClient}
              >
                <i className='fi fi-sr-angle-square-right'></i>
              </button>
            </div>
            <hr className=' h-0.1 border-0 rounded bg-preto dark:bg-dark2 mt-1 mb-5'></hr>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <div className=''>
                <h3 className='font-medium'>Gerar relatórios</h3>
                <h6 className='font-light text-sm'>Gerar PDF, planilhas e impressões</h6>
              </div>
              <OpenInNewTabButton onClick={handleOpenNewTab} /> {/* Use o novo componente aqui */}
            </div>
            <hr className='h-0.1 border-0 rounded bg-preto dark:bg-dark2 mt-1 mb-5'></hr>
          </div>
        </div>
      </div>
      <div className='bg-azulClaro dark:bg-dark2 p-8 bg-opacity-40 rounded-3xl dark:text-white'>
        <h6 className=' font-bold text-green-600 dark:text-green-400 text-sm'>
          Ganhos do Cliente:
        </h6>
        <ul className='grid gap-2 grid-rows-1 mt-4'>
          {results.map((result, index) => (
            <li key={index} className=''>
              {Array.isArray(result) ? (
                result.map((item, itemIndex) => (
                  <div className='grid grid-cols-1' key={itemIndex}>
                    {renderResultItem(item)}
                  </div>
                ))
              ) : (
                <div className='grid grid-cols-1 dark:divide-dark3'>{renderResultItem(result)}</div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Renderize a caixa de seleção de cliente quando necessário */}
      {mostrarCaixaSelecao && (
        <SelecaoClienteBox
          clientes={clientes}
          onClienteSelecionado={handleClienteSelecionado}
          onClose={handleCloseCaixaSelecao}
        />
      )}

      {mostrarAviso && (
        <div className='fixed bottom-4 right-4 border-2 border-green-500 rounded-lg bg-branco z-10'>
          <div className='p-3 rounded flex divide-x space-x-2'>
            <div className=' space-x-2 flex text-green-500 text-lg'>
              <div>
                <i className='fi fi-ss-check-circle'></i>
              </div>
              <span className=' text-sm text-preto font-semibold'>
                O resultado foi vinculado ao cliente com sucesso
              </span>
            </div>
            <button
              className='text-sm font-semibold text-preto pl-2'
              onClick={() => setMostrarAviso(false)}
            >
              <i className='fi fi-br-cross-small'></i>
            </button>
          </div>
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
