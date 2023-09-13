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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const addCliente = (cliente) => {
    setClientes([...clientes, cliente]);
    setMostrarFormulario(false);
  };

  const updateCliente = (cliente) => {
    const updatedClientes = clientes.map((c) => (c.cpf === cliente.cpf ? cliente : c));
    setClientes(updatedClientes);
    setModoEdicao(false);
    setClienteEditando(null);
    setMostrarFormulario(false);
  };

  const deleteCliente = (cpf) => {
    const filteredClientes = clientes.filter((cliente) => cliente.cpf !== cpf);
    setClientes(filteredClientes);
    setMostrarPerfil(false); // Oculta o perfil do cliente após a exclusão
    setClienteSelecionado(null); // Limpa a seleção do cliente
  };

  const handleClienteClick = (cliente) => {
    setClienteSelecionado(cliente);
    setMostrarPerfil(true);
    setMostrarFormulario(false); // Certificar-se de que o formulário esteja oculto ao clicar em um cliente
  };

  const ativarModoEdicao = (cliente) => {
    setModoEdicao(true);
    setClienteEditando(cliente);
    setMostrarFormulario(true);
    setMostrarPerfil(false);
  };

  useEffect(() => {
    // Salva os clientes no localStorage sempre que a lista de clientes for atualizada
    saveClientes(clientes);
  }, [clientes]);

  return (
    <div>
      <div className=' inline-block fixed bottom-0 right-0 mb-12 mr-12'>
        <button
          onClick={() => {
            setMostrarFormulario(true);
            setMostrarPerfil(false);
          }}
        >
          <div className='bg-azulEscuro w-24 h-24 rounded-full grid place-items-center -space-y-8 text-branco shadow-lg'>
            <i className='fi fi-sr-users-medical text-4xl'></i>
            <span className='text-sm font-bold leading-4'>Adicionar Clientes</span>
          </div>
        </button>
      </div>

      {/* Renderizar o formulário se mostrarFormulario for verdadeiro */}
      {mostrarFormulario && (
        <ClienteForm
          addCliente={addCliente}
          updateCliente={updateCliente}
          editCliente={modoEdicao ? clienteEditando : null}
          onCancel={() => setMostrarFormulario(false)} // Passa a função onCancel para ocultar o formulário
        />
      )}

      {/* Renderizar o perfil do cliente se mostrarPerfil for verdadeiro */}
      {mostrarPerfil && (
        <PerfilCliente
          cliente={clienteSelecionado}
          onEditarClick={() => ativarModoEdicao(clienteSelecionado)}
          deleteCliente={(cpf) => deleteCliente(cpf)} // Passar o CPF do cliente para a função deleteCliente
          onVoltarClick={() => {
            setMostrarPerfil(false);
            setClienteSelecionado(null);
          }}
        />
      )}

      {/* Renderizar a lista de clientes */}
      {!mostrarFormulario && !mostrarPerfil && (
        <ClienteList
          clientes={clientes}
          setEditCliente={handleClienteClick}
          onClienteClick={handleClienteClick}
        />
      )}
    </div>
  );
}

export default ClientesApp;
