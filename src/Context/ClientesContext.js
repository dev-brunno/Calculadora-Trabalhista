import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import app from '../Firebase/firebase'; // Importe a instância do Firebase configurada anteriormente.

const ClientesContext = createContext();

export const useClientes = () => {
  return useContext(ClientesContext);
};

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

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

    // Chame fetchClientes apenas uma vez quando o componente for montado
    if (clientes.length === 0) {
      loadClientes();
    }
  }, []); // Dependência vazia para executar apenas na montagem inicial

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

ClientesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
