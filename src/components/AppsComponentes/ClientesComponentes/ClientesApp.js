import React, { useState, useEffect } from 'react';
import ClienteForm from '../../InterfaceComponents/InterfaceClientes/ClienteForm.component';
import ClienteList from '../../InterfaceComponents/InterfaceClientes/ClienteList.component';
import PerfilCliente from '../../InterfaceComponents/InterfaceClientes/PerfilCliente.component';

// Função para salvar os clientes no localStorage
const saveClientes = (clientes) => {
  localStorage.setItem('clientes', JSON.stringify(clientes));
};

// Função para carregar os clientes do localStorage
const loadClientes = () => {
  const storedClientes = localStorage.getItem('clientes');
  return storedClientes ? JSON.parse(storedClientes) : [];
};

function ClientesApp() {
  const [clientes, setClientes] = useState(loadClientes()); // Carrega os clientes do localStorage
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [displayState, setDisplayState] = useState('clienteList'); // Pode ser 'clienteList', 'clientePerfil', 'clienteForm' ou 'confirmacaoExclusao'
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const addCliente = (cliente) => {
    setClientes([...clientes, cliente]);
    setDisplayState('clienteList'); // Exibir a lista de clientes após a adição
  };

  const updateCliente = (cliente) => {
    const updatedClientes = clientes.map((c) => (c.cpf === cliente.cpf ? cliente : c));
    setClientes(updatedClientes);
    setModoEdicao(false);
    setClienteEditando(null);
    setDisplayState('clienteList'); // Exibir a lista de clientes após a atualização
  };

  const deleteCliente = (cpf) => {
    const filteredClientes = clientes.filter((cliente) => cliente.cpf !== cpf);
    setClientes(filteredClientes);
    setDisplayState('clienteList'); // Exibir a lista de clientes após a exclusão
    setClienteSelecionado(null);
  };

  const handleClienteClick = (cliente) => {
    setClienteSelecionado(cliente);
    setDisplayState('clientePerfil'); // Exibir o perfil do cliente
  };

  const ativarModoEdicao = (cliente) => {
    setModoEdicao(true);
    setClienteEditando(cliente);
    setDisplayState('clienteForm'); // Exibir o formulário de edição
  };

  useEffect(() => {
    // Salva os clientes no localStorage sempre que a lista de clientes for atualizada
    saveClientes(clientes);
  }, [clientes]);

  const handleConfirmDelete = () => {
    deleteCliente(clienteEditando.cpf);
    setDisplayState('clienteList'); // Exibir a lista de clientes após a exclusão
  };

  const handleCancelDelete = () => {
    setDisplayState('clienteList'); // Voltar para a lista de clientes ao cancelar a exclusão
  };

  return (
    <div>
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
          editCliente={modoEdicao ? clienteEditando : null}
          deleteCliente={(cpf) => deleteCliente(cpf)}
          onCancel={() => setDisplayState('clienteList')} // Voltar para a lista de clientes ao cancelar
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
