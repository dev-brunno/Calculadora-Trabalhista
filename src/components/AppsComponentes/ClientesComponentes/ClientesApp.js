import React, { useState, useEffect } from 'react';
import ClienteForm from '../../InterfaceComponents/InterfaceClientes/ClienteForm.component';
import ClienteList from '../../InterfaceComponents/InterfaceClientes/ClienteList.component';
import PerfilCliente from '../../InterfaceComponents/InterfaceClientes/PerfilCliente.component';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import app from '../../../Firebase/firebase'; // Importe a instância do Firebase que você configurou anteriormente.

function ClientesApp() {
  const [clientes, setClientes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [displayState, setDisplayState] = useState('clienteList');
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

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

  const addCliente = async (cliente) => {
    const db = getFirestore(app);
    const clientesCollection = collection(db, 'clientes');

    try {
      await addDoc(clientesCollection, cliente);

      const clientesData = await loadClientes();
      setClientes(clientesData);
      setDisplayState('clienteList');
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  const updateCliente = async (cliente) => {
    const db = getFirestore(app);
    const clientesCollection = collection(db, 'clientes');

    try {
      const clienteDoc = doc(clientesCollection, cliente.id); // Use o ID como chave
      await updateDoc(clienteDoc, cliente);

      const clientesData = await loadClientes();
      setClientes(clientesData);
      setModoEdicao(false);
      setClienteEditando(null);
      setDisplayState('clienteList');
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const deleteCliente = async (id) => {
    // Use o ID como argumento
    const db = getFirestore(app);
    const clientesCollection = collection(db, 'clientes');

    try {
      const clienteDoc = doc(clientesCollection, id); // Use o ID como chave
      await deleteDoc(clienteDoc);

      const clientesData = await loadClientes();
      setClientes(clientesData);
      setDisplayState('clienteList');
      setClienteSelecionado(null);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  useEffect(() => {
    const fetchClientes = async () => {
      const clientesData = await loadClientes();
      setClientes(clientesData);
    };

    fetchClientes();
  }, []);

  const handleClienteClick = (cliente) => {
    setClienteSelecionado(cliente);
    setDisplayState('clientePerfil'); // Exibir o perfil do cliente
  };

  const ativarModoEdicao = (cliente) => {
    setModoEdicao(true);
    setClienteEditando(cliente);
    setDisplayState('clienteForm'); // Exibir o formulário de edição
  };

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
