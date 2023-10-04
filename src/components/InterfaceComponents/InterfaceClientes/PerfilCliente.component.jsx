import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CalculationCard from '../../InterfaceComponents/InterfaceCalculation/CalculationCard.component';
import { getFirestore, doc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore';
import ReportPDF from '../InterfaceCalculation/ReportPDF.component';
import OpenInNewTabButton from '../InterfaceCalculation/OpenInNewTabButton.component';
import FormataRealBrasileiro from '../../../Classes/Calculos/FormataRealBrasileiro';
import FormataDataBrasileira from '../../../Classes/Calculos/FormataDataBrasileira';

// Componente PerfilCliente que exibe o perfil de um cliente
function PerfilCliente({ cliente, onEditarClick, onVoltarClick }) {
  // Estados
  const [cálculoSelecionado, setCálculoSelecionado] = useState(null);
  const [resultadosCalculos, setResultadosCalculos] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Efeito para carregar os resultados de cálculos do cliente a partir do Firestore
  useEffect(() => {
    const db = getFirestore();
    const clienteDocRef = doc(db, 'clientes', cliente.id);

    const unsubscribe = onSnapshot(clienteDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const clienteData = docSnapshot.data();
        setResultadosCalculos(clienteData.ResultadosCalculos);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [cliente.id]);

  // Função auxiliar para renderizar um item de detalhe
  const renderDetailItem = (label, value) => (
    <li className='flex space-x-2 text-azulEscuro dark:text-dark3'>
      <label className='text-2xl mt-1' htmlFor='nome'>
        {label}
      </label>
      <div className='border border-cinzaMedio h-9 w-52 p-2 rounded-r-2xl rounded-bl-2xl text-sm'>
        {value}
      </div>
    </li>
  );

  // Função para lidar com a exclusão de um cálculo
  const handleExcluirCalculo = async () => {
    const db = getFirestore();
    const clienteDocRef = doc(db, 'clientes', cliente.id);

    try {
      const clienteSnapshot = await getDoc(clienteDocRef);
      if (clienteSnapshot.exists()) {
        const clienteData = clienteSnapshot.data();
        const resultadosCalculos = { ...clienteData.ResultadosCalculos };

        if (cálculoSelecionado) {
          delete resultadosCalculos[cálculoSelecionado];
          await updateDoc(clienteDocRef, { ResultadosCalculos: resultadosCalculos });
          setCálculoSelecionado(null); // Limpar o cálculo selecionado após a exclusão
        } else {
          console.error('Nenhum cálculo selecionado para excluir.');
        }
      } else {
        console.error('O documento do cliente não foi encontrado.');
      }
    } catch (error) {
      console.error('Erro ao excluir cálculo:', error);
    }
  };

  // Função para mostrar a confirmação de exclusão de cálculo
  const handleShowConfirmDelete = () => {
    setConfirmDelete(true);
  };

  // Função para cancelar a exclusão de cálculo
  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  // Função para confirmar a exclusão de cálculo
  const handleConfirmDelete = async () => {
    handleExcluirCalculo();
    setConfirmDelete(false); // Feche a caixa de confirmação após a exclusão
  };

  const ordenarCalculos = (calculos) => {
    const chavesDesejadas = [
      'Período',
      'Ano correspondente',
      'Última Remuneração',
      'Remuneração',
      'Salário Mensal',
      'Salário Base',
      'Férias',
      'Terço Constitucional',
      'Grau de Insalubridade',
    ];

    const ordenado = {};

    // Cria um objeto ordenado com base na ordem desejada das chaves (exceto 'Valor a Receber')
    chavesDesejadas.forEach((chave) => {
      if (calculos[chave]) {
        ordenado[chave] = calculos[chave];
      }
    });

    // Adiciona outras chaves que não estão na lista de chaves desejadas (exceto 'Valor a Receber')
    for (const chave in calculos) {
      if (!ordenado[chave] && !chavesDesejadas.includes(chave) && chave !== 'Valor a Receber') {
        ordenado[chave] = calculos[chave];
      }
    }

    // Adicione 'Valor a Receber' por último, se existir
    if (calculos['Valor a Receber']) {
      ordenado['Valor a Receber'] = calculos['Valor a Receber'];
    }

    return ordenado;
  };

  // Função para renderizar um item de resultado de cálculo
  const renderResultItem = (item) => {
    if (!cálculoSelecionado || !resultadosCalculos[cálculoSelecionado]) {
      return null; // Não renderize nada se o cálculo selecionado não existir
    }

    const calculosOrdenados = ordenarCalculos(item);

    return Object.entries(calculosOrdenados).map(([key, value], subIndex) => (
      <div
        className={`text-sm flex md:w-64 justify-between ${key === 'Período' ? 'font-bold' : ''} ${
          key === 'Valor a Receber'
            ? ' font-bold bg-VerdeEscuro text-branco p-2 mt-3 rounded-md'
            : ''
        }`}
        key={subIndex}
      >
        <div>{key}</div>
        <div>{typeof value === 'number' ? FormataRealBrasileiro(value) : value}</div>
      </div>
    ));
  };

  const handleOpenNewTab = (novaAba) => {
    const root = ReactDOM.createRoot(novaAba.document.getElementById('report-pdf-container'));

    let dataCliente = FormataDataBrasileira(new Date(cliente.dataNascimento));

    let perfil = {
      Nome: cliente.nome,
      CPF: cliente.cpf,
      'Data de nascimento': dataCliente,
      Email: cliente.email,
      Telefone: cliente.telefone,
    };

    root.render(
      <React.StrictMode>
        <ReportPDF
          title={'Relatório Trabalhista'}
          results={perfil}
          calculationResults={resultadosCalculos}
        />
      </React.StrictMode>,
    );
  };

  return (
    <div>
      <div className=' border border-azulEscuro dark:border-dark3 p-8 rounded-3xl relative z-10'>
        <div className='absolute -top-12 inset-x-0  lg:-left-8 lg:-top-8  w-28 m-auto lg:m-0'>
          <div className='relative'>
            <div className='bg-azulClaro dark:bg-dark2 w-28 h-28 rounded-full grid place-items-center shadow-md'>
              <div className=' bg-cinzaClaro dark:bg-dark4 w-24 h-24 rounded-full grid place-items-center text-azulClaro dark:text-dark3 text-6xl'>
                <i className='fi fi-sr-user'></i>
              </div>
            </div>
            <div className='bg-azulClaro dark:bg-dark3 w-10 h-10 rounded-full grid place-items-center  absolute bottom-0 right-0'>
              <button
                onClick={onEditarClick}
                className=' bg-cinzaClaro w-8 h-8 rounded-full grid place-items-center text-azulEscuro dark:text-dark3 dark:hover:text-dark4'
                title='Editar Cliente'
              >
                <i className='fi fi-sr-user-pen'></i>
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row mt-12 lg:mt-0'>
          <div className='lg:ml-16'>
            <h2 className='text-xl text-VerdeMedio dark:text-dark3'>Perfil do Cliente</h2>
            <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio dark:bg-dark3 mt-1 mb-5'></hr>
            <ul className='flex flex-col space-y-2'>
              {renderDetailItem(<i className='fi fi-ss-user'></i>, cliente.nome)}
              {renderDetailItem(<i className='fi fi-sr-id-badge'></i>, cliente.cpf)}
              {renderDetailItem(
                <i className='fi fi-sr-calendar'></i>,
                FormataDataBrasileira(new Date(cliente.dataNascimento)),
              )}
              {renderDetailItem(<i className='fi fi-sr-envelope'></i>, cliente.email)}
              {renderDetailItem(<i className='fi fi-sr-phone-flip'></i>, cliente.telefone)}
              <div className='flex '>
                <label className='text-azulEscuro dark:text-dark3 text-2xl mt-1'>
                  <i className='fi fi-sr-marker'></i>
                </label>
                <div className=' space-y-2'>
                  <div>{renderDetailItem('', cliente.cep)}</div>
                  <div>{renderDetailItem('', cliente.endereco)}</div>
                  <div className='flex w-52 space-x-1 ml-2 text-azulEscuro dark:text-dark3'>
                    <div className='w-2/3'>
                      <div className='border border-cinzaMedio  w-full h-9 p-2 rounded-r-2xl rounded-bl-2xl text-sm'>
                        {cliente.cidade}
                      </div>
                    </div>
                    <div className=' w-1/3'>
                      <div className='border border-cinzaMedio h-9 w-full p-2 rounded-r-2xl rounded-bl-2xl text-sm'>
                        {cliente.estado}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
          {/* Mostrar o resultado do cálculo selecionado */}
          {resultadosCalculos && Object.keys(resultadosCalculos).length > 0 && (
            <div id='resultados' className='mt-4 lg:mt-0 lg:ml-16'>
              {cálculoSelecionado ? (
                // Se um cálculo foi selecionado, não renderize o card de nome e ícone
                <div className=''>
                  <h2 className='text-xl text-VerdeMedio dark:text-dark3'>{cálculoSelecionado}</h2>
                  <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio dark:bg-dark3 mt-1 mb-5'></hr>
                  <div className='bg-azulClaro dark:bg-dark2 p-4 bg-opacity-40 rounded-3xl dark:text-white'>
                    <h6 className=' font-bold text-green-600 text-sm'>Ganhos do Cliente:</h6>
                    <ul className='grid gap-2 grid-rows-1 mt-4'>
                      {Array.isArray(resultadosCalculos[cálculoSelecionado]) ? (
                        resultadosCalculos[cálculoSelecionado].map((result, index) => (
                          <li key={index} className=''>
                            <div className='grid grid-cols-1 divide-y divide-gray-400 dark:divide-dark3'>
                              {renderResultItem(result)}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li>
                          <div className='grid grid-cols-1 divide-y divide-gray-400 dark:divide-dark3'>
                            {renderResultItem(resultadosCalculos[cálculoSelecionado])}
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                  <button
                    title='Remover Cálculo'
                    onClick={handleShowConfirmDelete}
                    className='text-branco mt-2 bg-red-500 hover:bg-azulEscuro dark:hover:bg-dark4 p-2 rounded-full w-11'
                  >
                    <div className='mt-1'>
                      <i className='fi fi-sr-trash'></i>
                    </div>
                  </button>
                  {confirmDelete && (
                    <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50'>
                      <div className='bg-white p-4 rounded-lg shadow-lg'>
                        <p>Tem certeza que deseja excluir esse cálculo do perfil do cliente?</p>
                        <div className='mt-4 flex justify-end'>
                          <button
                            onClick={handleConfirmDelete}
                            className='text-red-500 mr-2 bg-gray-100 p-2 rounded-md'
                          >
                            Excluir
                          </button>
                          <button
                            onClick={handleCancelDelete}
                            className=' text-black mr-2 bg-blue-100 p-2 rounded-md'
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Se nenhum cálculo foi selecionado, renderize o card de nome e ícone
                <div>
                  <h2 className='text-xl text-VerdeMedio dark:text-dark3'>Cálculos</h2>
                  <hr className='w-16 h-0.1 border-0 rounded bg-VerdeMedio dark:bg-dark3 mt-1 mb-5'></hr>
                  {/* Mapeamento dos cálculos */}
                  <div id='CalcResultList' className='grid gap-2 grid-cols-2 mt-4'>
                    {Object.entries(resultadosCalculos).map(([titulo], index) => (
                      <CalculationCard
                        key={index}
                        icon={titulo} // Substitua pelo ícone correto
                        title={titulo}
                        onClick={() => setCálculoSelecionado(titulo)} // Atualiza o estado com o cálculo selecionado
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className=' w-60 mt-5'>
                <div className='flex items-center justify-between'>
                  <div className=' text-azulEscuro dark:text-dark3'>
                    <h3 className='font-medium'>Gerar relatórios</h3>
                    <h6 className='font-light text-sm'>Gerar PDF, planilhas e impressões</h6>
                  </div>
                  <OpenInNewTabButton onClick={handleOpenNewTab} />{' '}
                  {/* Use o novo componente aqui */}
                </div>
                <hr className='h-0.1 border-0 rounded bg-azulEscuro dark:bg-dark2 mt-1 mb-5'></hr>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=' inline-block absolute -bottom-14 left-0 '>
        <button
          className=' text-cinzaMedio dark:hover:text-dark3 p-3 hover:text-azulEscuro dark:text-branco '
          onClick={onVoltarClick}
        >
          <i className='fi fi-rr-arrow-small-left'> Voltar</i>
        </button>
      </div>
    </div>
  );
}

// Propriedades esperadas para o componente PerfilCliente
PerfilCliente.propTypes = {
  cliente: PropTypes.object.isRequired,
  onEditarClick: PropTypes.func.isRequired,
  onVoltarClick: PropTypes.func.isRequired,
};

export default PerfilCliente;
