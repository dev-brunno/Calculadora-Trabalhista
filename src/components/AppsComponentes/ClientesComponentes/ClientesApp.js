import React, { useState, useEffect } from 'react';
import ClienteForm from '../../InterfaceComponents/InterfaceClientes/ClienteForm.component';
import ClienteList from '../../InterfaceComponents/InterfaceClientes/ClienteList.component';
import PerfilCliente from '../../InterfaceComponents/InterfaceClientes/PerfilCliente.component';
import app from '../../../Firebase/firebase';
import { useClientes } from '../../../Context/ClientesContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Definição do componente ClientesApp
function ClientesApp() {
  const [displayState, setDisplayState] = useState('clienteList'); // Controla o estado de exibição da interface
  const [clienteSelecionado, setClienteSelecionado] = useState(null); // Armazena o cliente selecionado

  const {
    clientes,
    addCliente,
    updateCliente,
    deleteCliente,
    modoEdicao,
    setModoEdicao,
    setClientes,
    clienteEditando,
    setClienteEditando,
  } = useClientes(); // hook useClientes para acessar os dados dos clientes.

  // Função assíncrona para carregar a lista de clientes do Firestore
  const loadClientes = async () => {
    const db = getFirestore(app);
    const clientesCollection = collection(db, 'clientes');
    const querySnapshot = await getDocs(clientesCollection);

    const clientesArray = [];
    querySnapshot.forEach((doc) => {
      clientesArray.push({ id: doc.id, ...doc.data() });
    });

    return clientesArray;
  };

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        if (clientes.length === 0) {
          const clientesData = await loadClientes();

          // Atualize o contexto com a lista completa de clientes de uma só vez
          setClientes(clientesData);
        }
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    fetchClientes();
  }, [clientes]);

  // Manipuladores de eventos

  // Quando um cliente é clicado, define o cliente selecionado e exibe o perfil
  const handleClienteClick = (cliente) => {
    setClienteSelecionado(cliente);
    setDisplayState('clientePerfil'); // Exibir o perfil do cliente
  };

  // Ativa o modo de edição e exibe o formulário de edição
  const ativarModoEdicao = (cliente) => {
    setModoEdicao(true);
    setClienteEditando(cliente);
    setDisplayState('clienteForm'); // Exibir o formulário de edição
  };

  // Confirma a exclusão de um cliente
  const handleConfirmDelete = () => {
    deleteCliente(clienteEditando.cpf);
    setDisplayState('clienteList'); // Exibir a lista de clientes após a exclusão
  };

  // Cancela a exclusão de um cliente
  const handleCancelDelete = () => {
    setDisplayState('clienteList'); // Voltar para a lista de clientes ao cancelar a exclusão
  };

  // Renderização do componente
  return (
    <div>
      {/* Botão para adicionar clientes */}
      <div className=' inline-block fixed bottom-0 right-0 mb-12 mr-12'>
        <button
          onClick={() => {
            setDisplayState('clienteForm'); // Exibir o formulário ao clicar no botão "Adicionar Clientes"
          }}
        >
          <div className='bg-azulEscuro w-24 h-24 rounded-full grid place-items-center -space-y-8 text-branco shadow-lg'>
            <i className='fi fi-sr-users-medical text-4xl'></i>
            <span className='text-sm font-bold leading-4'>Adicionar Clientes</span>
          </div>
        </button>
      </div>

      {/* Renderização condicional de componentes com base em displayState */}
      {displayState === 'clienteList' && (
        <ClienteList
          clientes={clientes}
          setEditCliente={handleClienteClick}
          onClienteClick={handleClienteClick}
        />
      )}

      {displayState === 'clientePerfil' && (
        <PerfilCliente
          cliente={clienteSelecionado}
          deleteCliente={deleteCliente}
          onEditarClick={() => ativarModoEdicao(clienteSelecionado)}
          onVoltarClick={() => {
            setDisplayState('clienteList'); // Exibir a lista de clientes após voltar
            setClienteSelecionado(null);
          }}
        />
      )}

      {displayState === 'clienteForm' && (
        <ClienteForm
          addCliente={addCliente}
          updateCliente={updateCliente}
          editCliente={modoEdicao ? clienteEditando : null} // Correção aqui
          deleteCliente={clienteEditando ? () => deleteCliente(clienteEditando.id) : null}
          onCancel={() => setDisplayState('clienteList')}
        />
      )}

      {displayState === 'confirmacaoExclusao' && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50'>
          <div className='bg-white p-4 rounded-lg shadow-lg'>
            <p>Tem certeza que deseja excluir este cliente?</p>
            <div className='mt-4 flex justify-end'>
              <button
                onClick={handleConfirmDelete}
                className='text-red-500 mr-2 bg-gray-100 p-2 rounded-md'
              >
                Excluir
              </button>
              <button
                onClick={handleCancelDelete}
                className='text-black mr-2 bg-blue-100 p-2 rounded-md'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientesApp;
