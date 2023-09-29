import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import app from '../Firebase/firebase'; // Importa a instância do Firebase configurada anteriormente.

// Cria um contexto chamado ClientesContext
const ClientesContext = createContext();

// Define um hook personalizado useClientes para acessar o contexto
export const useClientes = () => {
  return useContext(ClientesContext);
};

// Componente ClientesProvider que fornece o contexto para a aplicação
export const ClientesProvider = ({ children }) => {
  // Define os estados iniciais
  const [clientes, setClientes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  // Efeito que carrega os clientes quando o componente é montado
  useEffect(() => {
    const loadClientes = async () => {
      try {
        const db = getFirestore(app);
        const clientesCollection = collection(db, 'clientes');
        const querySnapshot = await getDocs(clientesCollection);

        const clientesArray = [];
        querySnapshot.forEach((doc) => {
          clientesArray.push({ id: doc.id, ...doc.data() });
        });

        setClientes(clientesArray);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    // Chama fetchClientes apenas uma vez quando o componente for montado
    if (clientes.length === 0) {
      loadClientes();
    }
  }, []); // Dependência vazia para executar apenas na montagem inicial

  // Função para adicionar um cliente
  const addCliente = async (cliente) => {
    const db = getFirestore(app);
    const clientesCollection = collection(db, 'clientes');

    try {
      await addDoc(clientesCollection, cliente); // Use the provided client object

      const querySnapshot = await getDocs(clientesCollection);

      const clientesArray = [];
      querySnapshot.forEach((doc) => {
        clientesArray.push({ id: doc.id, ...doc.data() });
      });

      setClientes(clientesArray);
      setModoEdicao(false);
      setClienteEditando(null);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  // Função para atualizar um cliente
  const updateCliente = async (cliente) => {
    const db = getFirestore(app);
    const clientesCollection = collection(db, 'clientes');

    try {
      const clienteDoc = doc(clientesCollection, cliente.id);
      await updateDoc(clienteDoc, cliente);

      const querySnapshot = await getDocs(clientesCollection);

      const clientesArray = [];
      querySnapshot.forEach((doc) => {
        clientesArray.push({ id: doc.id, ...doc.data() });
      });

      setClientes(clientesArray);
      setModoEdicao(false);
      setClienteEditando(null);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  // Função para excluir um client
  const deleteCliente = async (id) => {
    const db = getFirestore(app);
    const clientesCollection = collection(db, 'clientes');

    try {
      const clienteDoc = doc(clientesCollection, id);
      await deleteDoc(clienteDoc);

      const querySnapshot = await getDocs(clientesCollection);

      const clientesArray = [];
      querySnapshot.forEach((doc) => {
        clientesArray.push({ id: doc.id, ...doc.data() });
      });

      setClientes(clientesArray);
      setModoEdicao(false);
      setClienteEditando(null);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  // Renderiza o contexto com os valores e os elementos filhos
  return (
    <ClientesContext.Provider
      value={{
        clientes,
        addCliente,
        updateCliente,
        deleteCliente,
        modoEdicao,
        setModoEdicao,
        setClientes,
        clienteEditando,
        setClienteEditando,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

// Define as propriedades esperadas para o ClientesProvider
ClientesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
